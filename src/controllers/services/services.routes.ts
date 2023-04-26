import { Router } from 'express';
import * as servicesController from './services.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload ,serviceUpload } from '../../middleware/fileUpload';

const router = Router();

router.route('').get(servicesController.ServicesList);
router.route('/add').post(authMiddleware.isAuthorized, serviceUpload.single('serviceImage'), servicesController.AddServices);
router.route('/edit').post(authMiddleware.isAuthorized, upload.single('serviceImage'), servicesController.Editservices);
router.route('/*').get(servicesController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, servicesController.DeleteService);

export default router