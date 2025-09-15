import { Router } from "express";
import {
  addRole,
  getRoles,
  getSingleRole,
  updateRole,
  updateRoleStatus,
} from "../Controllers/role.controller.js";
import RoleValidator from "../Validators/role.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
const router = Router();
router.route("/addRole").post(verifyJwt, RoleValidator, addRole);
router.route("/getRoles").get(verifyJwt, getRoles);
router.route("/getSingleRole/:id").get(verifyJwt, getSingleRole);
router.route("/updateRole/:id").put(verifyJwt, updateRole);
router.route("/updateRoleStatus/:id").patch(verifyJwt, updateRoleStatus);
export default router;
