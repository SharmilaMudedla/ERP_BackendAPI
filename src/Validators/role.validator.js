import { body } from "express-validator";
const RoleValidator = [
  body("name").notEmpty().withMessage("Role name is required").trim(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("permissions")
    .optional()
    .isArray()
    .withMessage("Permissions must be an array of strings")
    .custom(
      (arr) =>
        Array.isArray(arr) && arr.every((item) => typeof item === "string")
    ),
];
export default RoleValidator;
