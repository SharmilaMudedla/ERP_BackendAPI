import asyncHandler from "../Utils/asyncHandler.js";
import userModel from "../Models/user.model.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import parseValidations from "../Utils/parseValidations.js";
import bcrypt from "bcrypt";
import { verifyJwt, createJwtToken } from "../Middlewares/jwt.js";
import employeeModel from "../Models/employee.model.js";

// ################# CREATE USERS #####################
const addUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }

  const email = await userModel.findOne({ email: req.body.email });
  if (email) {
    return handleError(res, "Email already exists", 409, null);
  }

  const user = await userModel.create(req.body);

  handleSuccess(res, "User added successfully", 201, user);
});

// ################# GET USERS #####################
const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel
    .find()
    .populate([{ path: "roleId", select: "name" }])
    .select("-password");

  handleSuccess(res, "Users fetched successfully", 200, users);
});

// ################# GET SINGLE USER #####################
const getSingleUser = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid User ID", 400, null);
  }

  const getsingleuserdata = await userModel
    .findById(req.params.id)
    .populate([{ path: "roleId", select: "name" }])
    .select("-password");

  if (!getsingleuserdata) {
    return handleError(res, "User not found", 404, null);
  }

  handleSuccess(res, "User fetched successfully", 200, getsingleuserdata);
});
// ################# GET SINGLE USER PROFILE DETAILS #####################
const getProfileDetails = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  if (!userInfo) {
    return handleError(res, "Invalid or expired token", 401, null);
  }
  const userData = await userModel.findById(userInfo.id).select("-password");
  if (!userData) {
    return handleError(res, "User Data not found", 404, null);
  }

  handleSuccess(res, "User profile fetched successfully", 200, userData);
});
// ################# UPDATE USER #####################
const updateUser = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid User ID", 400, null);
  }

  const getuser = await userModel.findById(req.params.id);
  if (!getuser) {
    return handleError(res, "User not found", 404, null);
  }

  const userUpdate = await userModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-password");

  handleSuccess(res, "User updated successfully", 200, userUpdate);
});

// ################# UPDATE USER STATUS #####################
const updateUserStatus = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid User ID", 400, null);
  }

  const user = await userModel.findById(req.params.id);
  if (!user) {
    return handleError(res, "User not found", 404, null);
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(
      req.params.id,
      { isActive: !user.isActive },
      { new: true }
    )
    .select("-password");

  handleSuccess(res, "User status updated successfully", 200, updatedUser);
});

// ################# LOGIN USER #####################
const userLogin = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(error.array())
    );
  }

  let user = await userModel.findOne({ email: req.body.email });
  let sourceCollection = "userdetails";

  if (!user) {
    const employee = await employeeModel.findOne({ email: req.body.email });
    if (!employee) {
      return handleError(res, "User not found in either collection", 404, null);
    }
    if (req.body.password !== employee.employeeId) {
      return handleError(res, "Invalid Password", 401, null);
    }
    sourceCollection = "employee";
    user = employee;
  } else {
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return handleError(res, "Invalid Password", 401, null);
    }
  }

  const token = createJwtToken(user);
  handleSuccess(res, "User login successfully", 200, {
    token,
    user: {
      email: user.email,
      roleId: user.roleId,
    },
  });
});

// ======================= total managers =============================
const totalManagers = asyncHandler(async (req, res) => {
  const managers = await userModel.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "roleId",
        foreignField: "_id",
        as: "role",
      },
    },
    { $unwind: "$role" },
    { $match: { "role.name": "manager" } },
    { $count: "managerCount" },
  ]);
  handleSuccess(res, "Managers fetched successfully", 200, managers);
});

export {
  addUser,
  getUsers,
  getSingleUser,
  updateUser,
  updateUserStatus,
  userLogin,
  getProfileDetails,
  totalManagers,
};
