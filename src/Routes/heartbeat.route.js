import { Router } from "express";
import { heartBeatService } from "../controllers/heartbeat.controller.js";
import { CronJob } from "cron";
const heartbeatRouter = Router();

heartbeatRouter.route("/").get(heartBeatService);

const heartBeat = new CronJob("*/15 * * * *", heartBeatService);
heartBeat.start();

export default heartbeatRouter;
