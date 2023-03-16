import { Router } from 'express';
import * as AccountController from './accounts.controller';
import * as authMiddleware from '../../middleware/auth'

const router = Router();

router.route('/all').get(authMiddleware.isAuthorized, authMiddleware.isAdmin, AccountController.getAllAccounts);
router.route('/add-account').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, AccountController.AddAccount);

export default router