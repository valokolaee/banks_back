// src/utils/multerConfig.ts
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import getUserByReq from './getUserByReq';
import IRequest from '../types/IRequest';
import IUser from '../types/IUser';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req: IRequest, file, cb) => {
    // const _user: IUser = req?.user?.get({ plain: true });
    // const _userId = getUserByReq(req)?.id
 
    // Generate unique filename with original extension
    const uniqueName = `${uuidv4}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow images, documents, and common file types
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    // 'image/gif',
    // 'image/webp',
    // 'application/pdf',
    // 'text/plain',
    // 'application/msword',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'));
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter
});

// Multiple files upload configuration
export const uploadMultiple = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});