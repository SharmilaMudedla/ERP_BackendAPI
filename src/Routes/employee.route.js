import { Router } from "express";
import {
  addEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  updateEmployeeStatus,
  totalEmployees,
  getEmployeeProfileDetails,
  sendBirthdayRemainderstoAdmin,
  getEmployeeBirthdays,
} from "../Controllers/employee.controller.js";
import employeeValidator from "../Validators/employee.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
import { CronJob } from "cron";
const router = Router();
router.route("/addEmployee").post(verifyJwt, employeeValidator, addEmployee);
router.route("/getEmployees").get(verifyJwt, getEmployees);
router.route("/getSingleEmployee/:id").get(verifyJwt, getSingleEmployee);
router.route("/updateEmployee/:id").put(verifyJwt, updateEmployee);
router
  .route("/updateEmployeeStatus/:id")
  .patch(verifyJwt, updateEmployeeStatus);
router.route("/totalEmployees").get(verifyJwt, totalEmployees);
router
  .route("/getEmployeeProfileDetails")
  .get(verifyJwt, getEmployeeProfileDetails);
router.route("/getEmployeeBirthdays").get(verifyJwt, getEmployeeBirthdays);

//CRONS

const employeeBirthdayRemainderjob = new CronJob(
  "0 17 * * *",
  sendBirthdayRemainderstoAdmin
);
employeeBirthdayRemainderjob.start();

export default router;
