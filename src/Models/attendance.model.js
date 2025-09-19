import mongoose from "mongoose";
import convertTo24Hour from "../Utils/convert24hours.js";

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
      type: String, // Store time as string with AM/PM format
      required: function () {
        return this.status === "Present";
      },
    },
    checkOutTime: {
      type: String, // Same here
      required: function () {
        return this.status === "Present";
      },
      validate: {
        validator: function (value) {
          if (this.status !== "Present") return true;

          const checkIn24 = convertTo24Hour(this.checkInTime);
          const checkOut24 = convertTo24Hour(value);

          const checkInDate = new Date(`1970-01-01T${checkIn24}`);
          let checkOutDate = new Date(`1970-01-01T${checkOut24}`);

          if (checkOutDate <= checkInDate) {
            // overnight shift, advance day
            checkOutDate.setDate(checkOutDate.getDate() + 1);
          }

          return checkOutDate > checkInDate;
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
