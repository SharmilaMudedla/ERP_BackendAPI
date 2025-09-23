import mongoose from "mongoose";

const salarystructureSchema = new mongoose.Schema(
  {
    basicSalary: {
      type: Number,
      required: true,
    },
    HRA: {
      type: Number,
      required: true,
    },
    transportAllowance: {
      type: Number,
      required: true,
    },
    otherAllowance: {
      type: Number,
      required: true,
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    pf: {
      type: Number,
      required: true,
    },
    esi: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SalaryStructure", salarystructureSchema);
