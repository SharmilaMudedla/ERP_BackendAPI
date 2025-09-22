import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import asyncHandler from "../Utils/asyncHandler.js";

const getHealthBeatData = () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: "Server is operational",
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
    },
  };
};

const heartBeatService = asyncHandler(async (req, res) => {
  try {
    const healthbeat = getHealthBeatData();
    handleSuccess(res, "Health check successful", 200, healthbeat);
  } catch (error) {
    console.log("Health check failed:", error);
    return handleError(res, "Health check failed", 500, null, error);
  }
});

const cronHealthBeat = async () => {
  try {
    const healthbeat = getHealthBeatData();
    console.log("Cron Health Check:", JSON.stringify(healthbeat));
  } catch (error) {
    console.log("Cron health check failed:", error);
  }
};

export { heartBeatService, cronHealthBeat };
