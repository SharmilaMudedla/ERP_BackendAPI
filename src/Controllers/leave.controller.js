import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Leave from "../Models/leave.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";

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
  handleSuccess(res, "Leave added successfully", 201, leave);
});

// ========================== get leaves data ==================================
const getLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find().populate([
    {
      path: "employeeId",
      select: "firstName lastName",
    },
    {
      path: "approvedBy",
      select: "name",
    },
  ]);
  handleSuccess(res, "Leaves fetched successfully", 200, leaves);
});

// ========================== get single leaves data ==================================

const getSingleLeave = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Leave ID", 400, null);
  }
  const leave = await Leave.findById(req.params.id).populate([
    {
      path: "employeeId",
      select: "firstName lastName",
    },
    {
      path: "approvedBy",
      select: "name",
    },
  ]);
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
  const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  handleSuccess(res, "Leave updated successfully", 200, leave);
});
export { addLeave, getLeaves, getSingleLeave, updateLeave, updateLeaveStatus };
