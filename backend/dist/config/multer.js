"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storageEngine = multer_1.default.diskStorage({
    destination: "./dist",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});
const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    }
    else {
        cb("Error: You can Only Upload Images!!");
    }
};
function multerConfig() {
    return (0, multer_1.default)({
        storage: storageEngine,
        limits: { fileSize: 30000000 },
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        },
    });
}
exports.multerConfig = multerConfig;
