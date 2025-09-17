import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          if (this.status !== "Present") return true;
          return value > this.checkInTime;
        },
        message: "Check-out time must be after check-in time",
      },
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Attendance", attendanceSchema);
