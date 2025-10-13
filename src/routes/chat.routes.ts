// src/routes/user.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../config/multerConfig';
import { ChatController } from '../controllers/chat.controller';

const router = Router();


router.get('/', authenticate, ChatController.getAll);
router.post('/', authenticate, ChatController.create);






export default router;