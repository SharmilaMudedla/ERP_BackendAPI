import { Router } from "express";
import {
  addPayroll,
  getPayrolls,
  getSinglePayroll,
  updatePayroll,
} from "../Controllers/payroll.controller.js";
import { verifyJwt } from "../Middlewares/jwt.js";
import payrollValidator from "../Validators/payroll.validator.js";
const router = Router();
router.route("/addPayroll").post(verifyJwt, payrollValidator, addPayroll);
router.route("/getPayrolls").get(verifyJwt, getPayrolls);
router.route("/getSinglePayroll/:id").get(verifyJwt, getSinglePayroll);
router.route("/updatePayroll/:id").put(verifyJwt, updatePayroll);
export default router;
