import express from "express";
import cors from "cors";
import userRouter from "./Routes/user.routes.js";
import roleRouter from "./Routes/role.routes.js";
import fileRouter from "./Routes/file.routes.js";
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

export default app;
