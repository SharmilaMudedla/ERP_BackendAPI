import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const UPLOADS_DIR = process.env.UPLOADS_DIR || "uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, uuidv4() + fileExtension);
  },
});
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
