import { Router } from 'express';
import * as ContactUsController from './contactus.controller';
import * as authMiddleware from '../../middleware/auth'

const router = Router();

router.route('').get(authMiddleware.isAuthorized, authMiddleware.isAdmin, ContactUsController.ContactUsList);
router.route('/add').post(ContactUsController.AddContactUs);
router.route('/edit').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, ContactUsController.EditContactUs);
router.route('/*').get(ContactUsController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, ContactUsController.DeleteContactUs);

export default router