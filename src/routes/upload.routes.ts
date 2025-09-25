// src/routes/uploadRoutes.ts
import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { upload, uploadMultiple } from '../utils/multerConfig';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Single file upload
router.post('/', authenticate, upload.single('file'), UploadController.uploadFile);

// Multiple files upload
router.post('/upload-multiple', authenticate, uploadMultiple.array('files', 5), UploadController.uploadMultipleFiles);

// Delete file
router.delete('/file/:filename', UploadController.deleteFile);

// Get files list
router.get('/files', UploadController.getFiles);

export default router;