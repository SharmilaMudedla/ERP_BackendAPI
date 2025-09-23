import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import SalaryStructure from "../Models/salarystructure.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";
// ===================== create a salarystructure ======================
const addSalarystructure = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const salarystructure = await SalaryStructure.create(req.body);
  handleSuccess(
    res,
    "Salarystructure added successfully",
    201,
    salarystructure
  );
});

// ========================== get salary structures =====================================
const getSalarystructures = asyncHandler(async (req, res) => {
  const salarystructures = await SalaryStructure.find();
  handleSuccess(
    res,
    "Salarystructures fetched successfully",
    200,
    salarystructures
  );
});
// ======================== get single salarystructure =======================
const getSingleSalarystructure = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid salarystructure ID", 400, null);
  }
  const salarystructure = await SalaryStructure.findById(req.params.id);
  if (!salarystructure) {
    return handleError(res, "Salarystructure not found", 404, null);
  }
  handleSuccess(
    res,
    "Salarystructure fetched successfully",
    200,
    salarystructure
  );
});
// ======================== update salarystructure =======================
const updateSalarystructure = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid salarystructure ID", 400, null);
  }
  const salarystructure = await SalaryStructure.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!salarystructure) {
    return handleError(res, "Salarystructure not found", 404, null);
  }
  handleSuccess(
    res,
    "Salarystructure updated successfully",
    200,
    salarystructure
  );
});

export {
  addSalarystructure,
  getSalarystructures,
  getSingleSalarystructure,
  updateSalarystructure,
};
