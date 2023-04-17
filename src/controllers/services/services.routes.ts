import { Router } from 'express';
import * as servicesController from './services.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload } from '../../middleware/fileUpload';
import multer from 'multer';

// Set up multer middleware
const router = Router();




router.route('').get(servicesController.ServicesList);
// router.route('/add').post(authMiddleware.isAuthorized, servicesController.addService);
router.route('/add').post(authMiddleware.isAuthorized,upload.single('serviceImage'), servicesController.addService);
router.route('/addServiceSection').post(authMiddleware.isAuthorized, upload.single('sectionImage'),servicesController.addSections);
router.route('/edit').post(authMiddleware.isAuthorized,servicesController.Editservices);
router.route('/*').get(servicesController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, servicesController.DeleteService);

export default router