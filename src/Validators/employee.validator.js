import { body } from "express-validator";

export const employeeValidator = [
  body("firstName").notEmpty().withMessage("First name is required"),

  body("lastName").notEmpty().withMessage("Last name is required"),

  body("gender").notEmpty().withMessage("Gender is required"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .toDate()
    .withMessage("Date of birth must be a valid date"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),

  body("address").notEmpty().withMessage("Address is required"),

  body("departmentId")
    .notEmpty()
    .withMessage("Department is required")
    .isMongoId()
    .withMessage("Invalid Department ID"),

  body("designation").notEmpty().withMessage("Designation is required"),

  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required")
    .isISO8601()
    .toDate()
    .withMessage("Joining date must be a valid date"),

  body("employeeType").notEmpty().withMessage("Employee type is required"),

  body("salaryStructure")
    .optional()
    .isString()
    .withMessage("Salary structure must be a string"),
];

export default employeeValidator;
