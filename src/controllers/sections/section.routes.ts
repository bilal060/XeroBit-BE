import { Router } from 'express';
import * as sectioncontroller from './section.controller';
import * as authMiddleware from '../../middleware/auth'
import { serviceUpload } from '../../middleware/fileUpload';

// Set up multer middleware
const router = Router();

router.route('').get(sectioncontroller.SectionList);
router.route('/add').post(authMiddleware.isAuthorized, serviceUpload.single('sectionImage'),sectioncontroller.AddSections);
router.route('/edit').post(authMiddleware.isAuthorized,serviceUpload.single('sectionImage'),sectioncontroller.EditSection);
router.route('/*').get(sectioncontroller.FindOneSection);
router.route('/*').delete(authMiddleware.isAuthorized, sectioncontroller.DeleteSection);

export default router