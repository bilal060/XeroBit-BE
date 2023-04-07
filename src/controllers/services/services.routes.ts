import { Router } from 'express';
import * as servicesController from './services.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload } from '../../middleware/fileUpload';

const router = Router();

router.route('').get(servicesController.ServicesList);
router.route('/add').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('serviceImage'), servicesController.AddServices);
router.route('/edit').post(upload.single('serviceImage'), servicesController.Editservices);
router.route('/*').get(servicesController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, servicesController.DeleteService);

export default router