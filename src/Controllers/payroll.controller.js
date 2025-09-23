import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Payroll from "../Models/payroll.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";

// ========================== create payroll ====================================
const addPayroll = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const payroll = await Payroll.create(req.body);
  handleSuccess(res, "Payroll added successfully", 201, payroll);
});

// ============================ get payrolls ======================================

const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find().populate([
    {
      path: "employeeId",
      select: "firstName lastName email",
    },
  ]);
  handleSuccess(res, "Payrolls fetched successfully", 200, payrolls);
});

// ============================ get single payroll ======================================
const getSinglePayroll = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Payroll ID", 400, null);
  }
  const payroll = await Payroll.findById(req.params.id);
  if (!payroll) {
    return handleError(res, "Payroll not found", 404, null);
  }
  handleSuccess(res, "Payroll fetched successfully", 200, payroll);
});

// =========================== update payroll ================================
const updatePayroll = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid Payroll ID", 400, null);
  }
  const singlePayroll = await Payroll.findById(req.params.id);
  if (!singlePayroll) {
    return handleError(res, "Payroll not found", 404, null);
  }
  const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!payroll) {
    return handleError(res, "Payroll not found", 404, null);
  } else {
    handleSuccess(res, "Payroll updated successfully", 200, payroll);
  }
});
export { addPayroll, getPayrolls, getSinglePayroll, updatePayroll };
