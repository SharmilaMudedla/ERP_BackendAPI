import { body } from "express-validator";

const employeeValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .withMessage("Gender must be male or female"),

  body("dateOfBirth").notEmpty().withMessage("Date of Birth is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("address").notEmpty().withMessage("Address is required"),
];

export default employeeValidator;
