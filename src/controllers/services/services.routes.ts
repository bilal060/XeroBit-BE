import { Router } from 'express';
import * as servicesController from './services.controller';
const router = Router();

router.route('').get(servicesController.ServicesList);
router.route('/add').post(servicesController.AddServices);
router.route('/edit').post(servicesController.Editservices);
router.route('/*').get(servicesController.FindOne);

export default router