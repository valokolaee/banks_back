// src/routes/user.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../config/multerConfig';
import { ContentController } from '../controllers/content.controller';

const router = Router();


router.get('/', authenticate, ContentController.getAll);
router.post('/', authenticate, ContentController.create);






export default router;