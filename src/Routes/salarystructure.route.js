import { Router } from "express";
import {
  addSalarystructure,
  getSalarystructures,
  getSingleSalarystructure,
  updateSalarystructure,
} from "../Controllers/salarystructure.controller.js";
import salarystructureValidator from "../Validators/salarystructure.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";

const router = Router();
router
  .route("/addSalarystructure")
  .post(verifyJwt, salarystructureValidator, addSalarystructure);
router.route("/getSalarystructures").get(verifyJwt, getSalarystructures);
router
  .route("/getSalarystructure/:id")
  .get(verifyJwt, getSingleSalarystructure);
router
  .route("/updateSalarystructure/:id")
  .put(verifyJwt, updateSalarystructure);
export default router;
