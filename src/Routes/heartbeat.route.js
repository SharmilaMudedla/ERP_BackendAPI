import { Router } from "express";
import {
  heartBeatService,
  cronHealthBeat,
} from "../Controllers/heartbeat.controller.js";
import { CronJob } from "cron";

const heartbeatRouter = Router();

heartbeatRouter.route("/").get(heartBeatService);

const heartBeatJob = new CronJob("*/15 * * * *", cronHealthBeat);
heartBeatJob.start();

export default heartbeatRouter;
