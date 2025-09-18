import { Router } from "express";
import {
  addAttendance,
  getAttendances,
  getSingleAttendance,
  updateAttendance,
  getAttendanceByDate,
  getAttendanceByEmployeeId,
  getAttendanceBydateAndEmployeeId,
} from "../Controllers/attendance.controller.js";
import { verifyJwt } from "../Middlewares/jwt.js";
import attendanceValidator from "../Validators/attendance.validator.js";

const router = Router();
router
  .route("/addAttendance")
  .post(verifyJwt, attendanceValidator, addAttendance);
router.route("/getAttendances").get(verifyJwt, getAttendances);
router.route("/getSingleAttendance/:id").get(verifyJwt, getSingleAttendance);
router.route("/updateAttendance/:id").put(verifyJwt, updateAttendance);
router.route("/getAttendanceByDate/:date").get(verifyJwt, getAttendanceByDate);
router
  .route("/getAttendanceByEmployeeId/:employeeId")
  .get(verifyJwt, getAttendanceByEmployeeId);
router
  .route("/getAttendanceBydateAndEmployeeId/:date/:employeeId")
  .get(verifyJwt, getAttendanceBydateAndEmployeeId);
export default router;
