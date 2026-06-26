import multer from "multer";
import { env } from "../config/env.js";
import { validationError } from "../utils/api-error.js";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg", ".dwg", ".dxf"]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/acad",
  "application/dwg",
  "application/dxf",
  "application/octet-stream",
  "image/vnd.dwg",
  "image/vnd.dxf",
  "application/x-autocad",
  "application/x-dwg",
  "application/x-dxf",
]);

function fileExtension(fileName = "") {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex === -1 ? "" : fileName.slice(dotIndex).toLowerCase();
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: env.uploadMaxSizeMb * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const extension = fileExtension(file.originalname);
    if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_MIME_TYPES.has(file.mimetype)) {
      callback(validationError({ file: "Invalid file type" }));
      return;
    }

    callback(null, true);
  },
});

export const documentUpload = upload.single("file");
