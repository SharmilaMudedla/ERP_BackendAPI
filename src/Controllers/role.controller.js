import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Role from "../Models/role.model.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import parseValidations from "../Utils/parseValidations.js";

// ################# CREATE ROLE #####################
const addRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }

  const existingRole = await Role.findOne({ name: req.body.name });
  if (existingRole) {
    return handleError(res, "Role already exists", 409, null);
  }

  const newRole = await Role.create(req.body);
  handleSuccess(res, "Role added successfully", 201, newRole);
});

// ################# GET ALL ROLES #####################
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  return handleSuccess(res, "Roles fetched successfully", 200, roles);
});

// ################# GET SINGLE ROLE #####################
const getSingleRole = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid role ID", 400, null);
  }

  const roleData = await Role.findById(req.params.id);
  if (!roleData) {
    return handleError(res, "Role not found", 404, null);
  }

  handleSuccess(res, "Role fetched successfully", 200, roleData);
});

// ################# UPDATE ROLE #####################
const updateRole = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid role ID", 400, null);
  }

  const existingRole = await Role.findById(req.params.id);
  if (!existingRole) {
    return handleError(res, "Role not found", 404, null);
  }

  const roleUpdate = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  handleSuccess(res, "Role updated successfully", 200, roleUpdate);
});

// ################# UPDATE ROLE STATUS #####################
const updateRoleStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid role ID", 400, null);
  }

  const roleData = await Role.findById(req.params.id);
  if (!roleData) {
    return handleError(res, "Role not found", 404, null);
  }

  const updatedRole = await Role.findByIdAndUpdate(
    req.params.id,
    { isActive: !roleData.isActive },
    { new: true }
  );

  handleSuccess(res, "Role status updated successfully", 200, updatedRole);
});

export { addRole, getRoles, getSingleRole, updateRole, updateRoleStatus };
