import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Leave from "../Models/leave.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import emailTemplate from "../Utils/emailTemplate.js";
import User from "../Models/user.model.js";
import employeeModel from "../Models/employee.model.js";
import { sendEmail } from "../Utils/mailClient.js";

async function calculateLeavesLeft(employeeId) {
  const totalLeaves = 12;
  const leaves = await Leave.find({ employeeId, status: { $ne: "Rejected" } });
  const totalTaken = leaves.reduce((sum, leave) => sum + leave.totalDays, 0);
  return totalLeaves - totalTaken;
}
// ====================== create leave ========================
const addLeave = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const leave = await Leave.create(req.body);
  const employee = await employeeModel
    .findOne({ employeeId: req.body.employeeId })
    .select("firstName lastName email");
  const manager = await User.findById(req.body.reportingManager).select(
    "name email"
  );

  if (!employee || !manager) {
    return handleError(res, "Employee or Manager not found", 404, null);
  }
  const leavesLeft = await calculateLeavesLeft(req.body.employeeId);
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_EMAIL,
  //     pass: process.env.SMTP_EMAIL_PASSWORD,
  //   },
  // });

  try {
    const info = await sendEmail({
      from: `${employee.firstName} ${employee.lastName} <${employee.email}>`,
      to: manager.email,
      subject: "Leave Application Request",
      html: emailTemplate({ ...leave.toObject(), employee, manager }),
    });
  } catch (err) {
    console.error("Email sending failed:", err);
  }

  handleSuccess(res, "Leave added successfully", 201, {
    ...leave.toObject(),
    leavesLeft,
  });
});
// ===================== get leaves left for a specific employee ====================
const getLeavesLeft = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  if (!employeeId) {
    return handleError(res, "Employee ID is required", 400, null);
  }
  const leavesLeft = await calculateLeavesLeft(employeeId);
  handleSuccess(res, "Leaves left fetched successfully", 200, {
    employeeId,
    leavesLeft,
  });
});

// ========================== get leaves data ==================================
const getLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find();
  handleSuccess(res, "Leaves fetched successfully", 200, leaves);
});

// ========================== get single leaves data ==================================

const getSingleLeave = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Leave ID", 400, null);
  }
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    return handleError(res, "Leave not found", 404, null);
  }
  handleSuccess(res, "Leave fetched successfully", 200, leave);
});

// ============================= update leave ==================================================
const updateLeave = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Leave ID", 400, null);
  }
  const singleLeave = await Leave.findById(req.params.id);
  if (!singleLeave) {
    return handleError(res, "Leave not found", 404, null);
  }
  const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  handleSuccess(res, "Leave updated successfully", 200, leave);
});
// ============================= update leave status =====================================

const updateLeaveStatus = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Leave ID", 400, null);
  }
  const singleLeave = await Leave.findById(req.params.id);
  if (!singleLeave) {
    return handleError(res, "Leave not found", 404, null);
  }

  await Leave.findByIdAndUpdate(req.params.id, req.body);

  const leavesLeft = await calculateLeavesLeft(req.body.employeeId);

  const updatedLeave = await Leave.findById(req.params.id);
  handleSuccess(res, "Leave updated successfully", 200, {
    ...updatedLeave.toObject(),
    leavesLeft,
  });
});
// =============================  leaves by date  =====================================
const getLeavesByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return handleError(res, "Date is required", 400, null);
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const leaves = await Leave.find({
    createdAt: { $gte: start, $lte: end },
  });

  if (!leaves || leaves.length === 0) {
    return handleError(res, "There are no leaves Today", 404, null);
  }

  handleSuccess(res, "Records fetched successfully", 200, leaves);
});

export {
  addLeave,
  getLeaves,
  getSingleLeave,
  updateLeave,
  updateLeaveStatus,
  getLeavesLeft,
  getLeavesByDate,
};
