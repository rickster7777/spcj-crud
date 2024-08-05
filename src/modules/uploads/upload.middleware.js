import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Set up Multer storage and configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 } // 50MB file size limit
}).single('file');

// Middleware for handling file upload
export const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.create(400, 'Error uploading file', null);
    }
    next();
  });
};
