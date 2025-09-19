import { body } from "express-validator";
import convertTo24Hour from "../Utils/convert24hours.js";

const attendanceValidator = [
  body("employeeId").notEmpty().withMessage("Employee ID is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date (YYYY-MM-DD)"),
  body("checkInTime")
    .if((value, { req }) => req.body.status === "Present")
    .notEmpty()
    .withMessage("Check-in time is required for Present status")
    .bail()
    .custom((value) => {
      const regex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
      if (!regex.test(value.trim())) {
        throw new Error("Check-in time must be in hh:mm AM/PM format");
      }
      return true;
    }),

  // Check-out time: only validate if status is Present
  body("checkOutTime")
    .if((value, { req }) => req.body.status === "Present")
    .notEmpty()
    .withMessage("Check-out time is required for Present status")
    .bail()
    .custom((value, { req }) => {
      const regex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
      if (!regex.test(value.trim())) {
        throw new Error("Check-out time must be in hh:mm AM/PM format");
      }

      // Validate check-out is after check-in
      let checkIn24, checkOut24;
      try {
        checkIn24 = convertTo24Hour(req.body.checkInTime.trim());
        checkOut24 = convertTo24Hour(value.trim());
      } catch (err) {
        throw new Error("Invalid time format for check-in or check-out");
      }

      let checkIn = new Date(`1970-01-01T${checkIn24}`);
      let checkOut = new Date(`1970-01-01T${checkOut24}`);
      if (checkOut <= checkIn) {
        checkOut.setDate(checkOut.getDate() + 1);
      }

      if (checkOut <= checkIn) {
        throw new Error("Check-out time must be after check-in time");
      }

      return true;
    }),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Present", "Absent", "Leave"])
    .withMessage("Status must be one of Present, Absent, or Leave"),
];

export default attendanceValidator;
