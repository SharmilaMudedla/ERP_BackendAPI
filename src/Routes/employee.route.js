import { Router } from "express";
import {
  addEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  updateEmployeeStatus,
} from "../Controllers/employee.controller.js";
import employeeValidator from "../Validators/employee.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
const router = Router();
router.route("/addEmployee").post(verifyJwt, employeeValidator, addEmployee);
router.route("/getEmployees").get(verifyJwt, getEmployees);
router.route("/getSingleEmployee/:id").get(verifyJwt, getSingleEmployee);
router.route("/updateEmployee/:id").put(verifyJwt, updateEmployee);
router
  .route("/updateEmployeeStatus/:id")
  .patch(verifyJwt, updateEmployeeStatus);
export default router;
