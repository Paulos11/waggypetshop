const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = (mimeList = []) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `file-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (mimeList.length > 0) {
        if (mimeList.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("File type not supported"));
        }
      } else {
        cb(null, true);
      }
    },
  });
};

module.exports = upload;
