import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Employee from "../Models/employee.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";

// ====================== create employee ========================

const addEmployee = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const existingEmployee = await Employee.findOne({ email: req.body.email });
  if (existingEmployee) {
    return handleError(res, "Employee already exists", 409, null);
  }
  const employee = await Employee.create(req.body);
  handleSuccess(res, "Employee added successfully", 201, employee);
});

// ====================== get all employees =======================

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  handleSuccess(res, "Employees fetched successfully", 200, employees);
});

// ====================== get single employee =======================

const getSingleEmployee = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }
  handleSuccess(res, "Employee fetched successfully", 200, employee);
});

// ====================== update employee =======================
const updateEmployee = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const singleEmployee = await Employee.findById(req.params.id);
  if (!singleEmployee) {
    return handleError(res, "Employee not found", 404, null);
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!employee) {
    return handleError(res, "Employee not found", 400, null);
  }
  handleSuccess(res, "Employee updated successfully", 200, employee);
});

// ======================== update employee status ===========================
const updateEmployeeStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    { isActive: !employee.isActive },
    { new: true }
  );
  handleSuccess(
    res,
    "Employee status updated successfully",
    200,
    updatedEmployee
  );
});

export {
  addEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  updateEmployeeStatus,
};
