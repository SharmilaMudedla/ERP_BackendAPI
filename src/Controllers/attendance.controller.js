import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Attendance from "../Models/attendance.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";

// ====================== create attendance ========================
const addAttendance = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }

  const attendance = await Attendance.create(req.body);
  handleSuccess(res, "Attendance added successfully", 201, attendance);
});

// ====================== get all attendances =======================
const getAttendances = asyncHandler(async (req, res) => {
  const attendances = await Attendance.find();
  handleSuccess(res, "Attendances fetched successfully", 200, attendances);
});

// ========================== get single attendance ==========================
const getSingleAttendance = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid attendance ID", 400, null);
  }
  const attendance = await Attendance.findById(req.params.id);
  if (!attendance) {
    return handleError(res, "Attendance not found", 404, null);
  }
  handleSuccess(res, "Attendance fetched successfully", 200, attendance);
});

// ========================== update attendance ==========================
const updateAttendance = asyncHandler(async (req, res) => {
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
    return handleError(res, "Invalid attendance ID", 400, null);
  }
  const singleAttendance = await Attendance.findById(req.params.id);
  if (!singleAttendance) {
    return handleError(res, "Attendance not found", 404, null);
  }
  const attendance = await Attendance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  handleSuccess(res, "Attendance updated successfully", 200, attendance);
});

// ======================== get attendance data by date ============================
const getAttendanceByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return handleError(res, "Date is required", 400, null);
  }
  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const attendances = await Attendance.find({
    date: { $gte: start, $lte: end },
  });
  if (!attendances) {
    return handleError(res, "records not found", 400, null);
  }
  handleSuccess(res, "records fetched successfully", 200, attendances);
});
export {
  addAttendance,
  getAttendances,
  getSingleAttendance,
  updateAttendance,
  getAttendanceByDate,
};
