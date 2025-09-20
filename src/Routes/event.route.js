import { Router } from "express";
import {
  addEvent,
  getEvents,
  getSingleEvent,
} from "../Controllers/event.controller.js";
import eventValidator from "../Validators/event.validator.js";
import { verifyJwt } from "../Middlewares/jwt.js";
const router = Router();
router.route("/addEvent").post(verifyJwt, eventValidator, addEvent);
router.route("/getEvents").get(verifyJwt, getEvents);
router.route("/getSingleEvent/:id").get(verifyJwt, getSingleEvent);
export default router;
