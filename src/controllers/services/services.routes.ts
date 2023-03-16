import { Router } from 'express';
import * as servicesController from './services.controller';
import * as authMiddleware from '../../middleware/auth'

const router = Router();

router.route('').get(servicesController.ServicesList);
router.route('/add').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, servicesController.AddServices);
router.route('/edit').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, servicesController.Editservices);
router.route('/*').get(servicesController.FindOne);

export default router