import { body } from "express-validator";

const eventValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .toDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date cannot be before start date");
      }
      return true;
    }),

  body("color")
    .notEmpty()
    .withMessage("Color is required")
    .matches(/^#([0-9A-F]{3}){1,2}$/i)
    .withMessage("Color must be a valid hex code"),

  body("description").optional(),
];

export default eventValidator;
