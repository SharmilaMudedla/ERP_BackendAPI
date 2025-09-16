import express from "express";
import cors from "cors";
import userRouter from "./Routes/user.routes.js";
import roleRouter from "./Routes/role.routes.js";
import fileRouter from "./Routes/file.routes.js";
import employeeRouter from "./Routes/employee.route.js";
import departmentRouter from "./Routes/department.route.js";
import attendanceRouter from "./Routes/attendance.route.js";
import leaveRouter from "./Routes/leave.route.js";
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/api/uploads", fileRouter);
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/department", departmentRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);

export default app;
