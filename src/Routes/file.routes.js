import { Router } from "express";
import { upload } from "../Middlewares/multer.js";
import { uploadFile } from "../Controllers/file.controller.js";
const router = Router();
router.route("/upload").post(upload.single("file"), uploadFile);

export default router;
