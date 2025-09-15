import { handleError } from "./responseHandler.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      handleError(
        res,
        err && err.message ? err.message : "Internal server error occurred",
        500,
        err
      );
    });
  };
};

export default asyncHandler;
