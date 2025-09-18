import { Router } from "express";
import {
  addLeave,
  getLeaves,
  getSingleLeave,
  updateLeave,
  updateLeaveStatus,
  getLeavesLeft,
} from "../Controllers/leave.controller.js";
import leaveValidator from "../Validators/leave.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
const router = Router();
router.route("/addLeave").post(verifyJwt, leaveValidator, addLeave);
router.route("/getLeaves").get(verifyJwt, getLeaves);
router.route("/getSingleLeave/:id").get(verifyJwt, getSingleLeave);
router.route("/updateLeave/:id").put(verifyJwt, updateLeave);
router.route("/updateLeaveStatus/:id").patch(verifyJwt, updateLeaveStatus);
router.route("/getLeavesLeft/:employeeId").get(verifyJwt, getLeavesLeft);
export default router;
