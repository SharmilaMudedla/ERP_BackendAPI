import { body } from "express-validator";

const UserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .trim(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("roleId")
    .notEmpty()
    .withMessage("Role ID is required")
    .isMongoId()
    .withMessage("Invalid Role ID format"),
];

const LoginValidations = [
  body("email")
    .notEmpty()
    .withMessage("Please enter email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  ,
];

export { UserValidator, LoginValidations };
