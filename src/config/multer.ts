import multer from "multer";
import path from "path";

const storageEngine = multer.diskStorage({
  destination: "./assets",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const checkFileType = function (file: any, cb: any) {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

 export function multerConfig() {
  return multer({
    storage: storageEngine,
    limits: { fileSize: 30000000 },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });
}
