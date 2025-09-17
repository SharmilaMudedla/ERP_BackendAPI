import { body } from "express-validator";

export const attendanceValidator = [
  body("employeeId").notEmpty().withMessage("Employee ID is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date (YYYY-MM-DD)"),

  body("checkInTime")
    .notEmpty()
    .withMessage("Check-in time is required")
    .isISO8601()
    .withMessage("Check-in time must be a valid date-time"),

  body("checkOutTime")
    .notEmpty()
    .withMessage("Check-out time is required")
    .isISO8601()
    .withMessage("Check-out time must be a valid date-time")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.checkInTime)) {
        throw new Error("Check-out time must be after check-in time");
      }
      return true;
    }),
];
