import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return handleError(res, "File not found", 400);
  }
  return handleSuccess(res, "File uploaded successfully", 200, {
    filename: req.file.filename,
    path: req.file.path,
  });
});
