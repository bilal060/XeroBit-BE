import { Router } from 'express';
import * as servicesController from './services.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload } from '../../middleware/fileUpload';
import multer from 'multer';

// Set up m     ulter middleware
const router = Router(); 
router.route('').get(servicesController.ServicesList); 
router.route('/add').post(authMiddleware.isAuthorized,upload.single('serviceImage'), servicesController.AddServices);
router.route('/edit').post(authMiddleware.isAuthorized,upload.single('serviceImage'),servicesController.Editservices);
router.route('/*').get(servicesController.FindOneService);
router.route('/*').delete(authMiddleware.isAuthorized, servicesController.DeleteService);

export default router     //9/9GFDG   VEREGRTTRTYHJGHN