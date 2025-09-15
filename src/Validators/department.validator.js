import { body } from "express-validator";

const departmentValidator = [
  body("name").notEmpty().withMessage("Department name is required"),

  body("description")
    .optional()
    .isLength({ max: 250 })
    .withMessage("Description cannot exceed 250 characters"),
];
export default departmentValidator;
