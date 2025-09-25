// routes/images.ts
import { Router } from 'express';
import { ImageController } from '../controllers/Image.controller';
 
const router = Router();

// Get all images
router.get('/', ImageController.getImages);

// Get images with pagination
router.get('/paginated', ImageController.getImagesPaginated);

// Get single image
router.get('/:filename', ImageController.getImage);

export default router;