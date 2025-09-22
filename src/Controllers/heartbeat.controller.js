import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";

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
    return handleError(res, "Health check failed", 500, null, error);
  }
});

export { heartBeatService };
