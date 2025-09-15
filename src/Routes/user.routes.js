import {
  addUser,
  getUsers,
  getSingleUser,
  updateUser,
  updateUserStatus,
  userLogin,
} from "../Controllers/user.controller.js";
import {
  UserValidator,
  LoginValidations,
} from "../Validators/user.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
import { Router } from "express";
const router = Router();

router.route("/addUser").post(verifyJwt, UserValidator, addUser);
router.route("/getUsers").get(verifyJwt, getUsers);
router.route("/getSingleUser/:id").get(verifyJwt, getSingleUser);
router.route("/updateUser/:id").put(verifyJwt, updateUser);
router.route("/changeUserStatus/:id").patch(verifyJwt, updateUserStatus);
router.route("/login").post(LoginValidations, userLogin);
export default router;
