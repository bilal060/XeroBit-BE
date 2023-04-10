import { Router } from 'express';
import * as ProjectsController from './projects.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload } from '../../middleware/fileUpload';

const router = Router();

router.route('').get(ProjectsController.ProjectsList);
router.route('/add').post(upload.single('serviceImage'), ProjectsController.Addprojects);
router.route('/edit').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('serviceImage'), ProjectsController.EditProjects);
router.route('/*').get(ProjectsController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, ProjectsController.DeleteProject);

export default router