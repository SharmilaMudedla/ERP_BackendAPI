import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import asyncHandler from "../Utils/asyncHandler.js";

const heartBeatService = asyncHandler(async (req, res) => {
  try {
    const status = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: "Server is operational",
    };

    const environment = {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
    };

    const healthcheck = {
      ...status,
      environment,
    };

    handleSuccess(res, "Health check successful", 200, healthcheck);
  } catch (error) {
    console.log("Health check failed:", error);
    return handleError(res, "Health check failed", 500, null, error);
  }
});

export { heartBeatService };
