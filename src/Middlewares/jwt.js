import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "../Utils/asyncHandler.js";
import { handleError } from "../Utils/responseHandler.js";

const createJwtToken = (user) => {
  return jsonwebtoken.sign(
    { id: user._id, email: user.email, roleId: user.roleId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};
const verifyJwt = asyncHandler(async (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  if (!AuthHeader) {
    return handleError(
      res,
      "Token is Not provided to verify the user access",
      401,
      null
    );
  }
  const token = AuthHeader.split(" ")[1];
  if (!token) {
    return handleError(res, "Unauthorized", 401, null);
  }
  try {
    const decodeToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    return handleError(res, error?.message || "unable verify the token", 401);
  }
});
export { createJwtToken, verifyJwt };
