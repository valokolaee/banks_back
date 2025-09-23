// src/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();


router.get('/', authenticate, UserController.getUserProfile);
router.get('/investments', authenticate, UserController.getUserInvestments);
router.get('/referrals', authenticate, UserController.getUserReferrals);
router.get('/loans', authenticate, UserController.getUserLoans);
router.get('/bank-affiliations', authenticate, UserController.getBankAffiliations);
router.put('/profile-image', authenticate, UserController.updateProfileImage);
router.put('/', authenticate, UserController.updateUserProfile);


export default router;