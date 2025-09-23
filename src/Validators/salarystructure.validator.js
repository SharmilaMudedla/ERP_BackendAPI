import { body } from "express-validator";

const salaryStructureValidator = [
  body("basicSalary")
    .notEmpty()
    .withMessage("Basic Salary is required")
    .isFloat({ min: 0 })
    .withMessage("Basic Salary must be a positive number"),

  body("HRA")
    .notEmpty()
    .withMessage("HRA is required")
    .isFloat({ min: 0 })
    .withMessage("HRA must be a positive number"),

  body("transportAllowance")
    .notEmpty()
    .withMessage("Transport Allowance is required")
    .isFloat({ min: 0 })
    .withMessage("Transport Allowance must be a positive number"),

  body("otherAllowance")
    .notEmpty()
    .withMessage("Other Allowance is required")
    .isFloat({ min: 0 })
    .withMessage("Other Allowance must be a positive number"),

  body("taxPercentage")
    .notEmpty()
    .withMessage("Tax Percentage is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax Percentage must be between 0 and 100"),

  body("pf")
    .notEmpty()
    .withMessage("PF is required")
    .isFloat({ min: 0 })
    .withMessage("PF must be a positive number"),

  body("esi")
    .notEmpty()
    .withMessage("ESI is required")
    .isFloat({ min: 0 })
    .withMessage("ESI must be a positive number"),
];

export default salaryStructureValidator;
