import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      Enum: ["MALE", "FEMALE"],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departments",
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: String,
      required: true,
    },
    employeeType: {
      type: String,
      enum: ["Full Time", "Part Time", "Contract", "Intern"],
      required: true,
    },
    salaryStructure: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Resigned", "Terminated"],
      default: "active",
    },
    roleId: {
      type: String,
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employees", employeeSchema);
