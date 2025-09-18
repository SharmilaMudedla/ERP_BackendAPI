import { body } from "express-validator";

const leaveValidator = [
  body("employeeId").notEmpty().withMessage("Employee ID is required"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),

  body("totalDays")
    .notEmpty()
    .withMessage("Total days is required")
    .isInt({ min: 1 })
    .withMessage("Total days must be at least 1"),

  body("reason")
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 3, max: 500 })
    .withMessage("Reason must be between 3 and 500 characters"),

  body("status")
    .optional()
    .isIn(["Pending", "Approved", "Rejected"])
    .withMessage("Status must be Pending, Approved, or Rejected"),

  body("reportingManager")
    .isMongoId()
    .withMessage("Invalid approvedBy ID format"),
];

export default leaveValidator;
