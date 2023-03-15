import { Router } from 'express';
import * as AccountController from './accounts.controller';
const router = Router();

router.route('/all').get(AccountController.getAllAccounts);
router.route('/add-account').post(AccountController.AddAccount);

export default router