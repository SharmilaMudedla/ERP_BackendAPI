import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Department from "../Models/department.model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import parseValidations from "../Utils/parseValidations.js";
import Employee from "../Models/employee.model.js";

// ======================= create department ========================
const addDepartment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const existingDepartment = await Department.findOne({ name: req.body.name });
  if (existingDepartment) {
    return handleError(res, "Department already exists", 409, null);
  }
  const department = await Department.create(req.body);
  handleSuccess(res, "Department added successfully", 201, department);
});

// ====================== get all departments =======================
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate([
    {
      path: "managerId",
      select: "name",
    },
  ]);
  handleSuccess(res, "Departments fetched successfully", 200, departments);
});
// ===================== get single department =======================
const getDepartment = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid department ID", 400, null);
  }
  const department = await Department.findById(req.params.id).populate([
    {
      path: "managerId",
      select: "name",
    },
  ]);
  if (!department) {
    return handleError(res, "Department not found", 404, null);
  }
  handleSuccess(res, "Department fetched successfully", 200, department);
});
// ======================= update department ========================
const updateDepartment = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid department ID", 400, null);
  }
  const singleDepartment = await Department.findById(req.params.id);
  if (!singleDepartment) {
    return handleError(res, "Department not found", 404, null);
  }
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  handleSuccess(res, "Department updated successfully", 200, department);
});
// ======================= update department status ========================
const updateDepartmentStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid department ID", 400, null);
  }
  const department = await Department.findById(req.params.id);
  if (!department) {
    return handleError(res, "Department not found", 404, null);
  }
  const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    { isActive: !department.isActive },
    { new: true }
  );
  handleSuccess(
    res,
    "Department status updated successfully",
    200,
    updatedDepartment
  );
});

// ============================= assign the departement to the employee ===========================
const assignDepartment = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid employee ID", 400, null);
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.departmentId)) {
    return handleError(res, "Invalid department ID", 400, null);
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return handleError(res, "Employee not found", 404, null);
  }
  const department = await Department.findById(req.body.departmentId);
  if (!department) {
    return handleError(res, "Department not found", 404, null);
  }
  const assginDept = await Employee.findByIdAndUpdate(
    req.params.id,
    { department: req.body.departmentId },
    { new: true }
  );
  handleSuccess(res, "Department assigned successfully", 200, employee);
});

// =============================== total departments ================================
const totalDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.countDocuments();
  return handleSuccess(res, "Count Fetched Successfully", 200, departments);
});

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  updateDepartmentStatus,
  assignDepartment,
  totalDepartments,
};
