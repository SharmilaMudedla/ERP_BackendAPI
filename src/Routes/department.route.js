import { Router } from "express";
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  updateDepartmentStatus,
} from "../Controllers/department.controller.js";
import departmentValidator from "../Validators/department.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";

const router = Router();
router
  .route("/addDepartment")
  .post(verifyJwt, departmentValidator, addDepartment);
router.route("/getDepartments").get(verifyJwt, getDepartments);
router.route("/getDepartment/:id").get(verifyJwt, getDepartment);
router
  .route("/updateDepartment/:id")
  .put(verifyJwt, departmentValidator, updateDepartment);
router
  .route("/updateDepartmentStatus/:id")
  .patch(verifyJwt, updateDepartmentStatus);

export default router;
