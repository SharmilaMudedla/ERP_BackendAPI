import express from "express";
import userRouter from "./Routes/user.routes.js";
import roleRouter from "./Routes/role.routes.js";
import fileRouter from "./Routes/file.routes.js";
import employeeRouter from "./Routes/employee.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/api/uploads", fileRouter);
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/employee", employeeRouter);

export default app;
