import { body } from "express-validator";

const payrollValidator = [
  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isMongoId()
    .withMessage("Invalid Employee ID format"),

  body("month")
    .notEmpty()
    .withMessage("Month is required")
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12"),

  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .isInt({ min: 1900 })
    .withMessage("Year must be a valid number"),

  body("basicSalary")
    .notEmpty()
    .withMessage("Basic Salary is required")
    .isFloat({ min: 0 })
    .withMessage("Basic Salary must be a positive number"),

  body("allowance")
    .notEmpty()
    .withMessage("Allowance is required")
    .isFloat({ min: 0 })
    .withMessage("Allowance must be a positive number"),

  body("deduction")
    .notEmpty()
    .withMessage("Deduction is required")
    .isFloat({ min: 0 })
    .withMessage("Deduction must be a positive number"),

  body("netSalary")
    .notEmpty()
    .withMessage("Net Salary is required")
    .isFloat({ min: 0 })
    .withMessage("Net Salary must be a positive number"),

  body("paymentDate")
    .notEmpty()
    .withMessage("Payment Date is required")
    .isDate()
    .withMessage("Payment Date must be a valid date"),

  body("paymentStatus")
    .notEmpty()
    .withMessage("Payment Status is required")
    .isIn(["Paid", "Unpaid"])
    .withMessage("Payment Status must be either Paid or Unpaid"),
];
export default payrollValidator;
