import { Router } from 'express';
import * as BlogController from './blogs.controller';
import * as authMiddleware from '../../middleware/auth'

const router = Router();

router.route('').get(BlogController.BlogsList);
router.route('/add').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, BlogController.AddBlog);
router.route('/edit').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, BlogController.EditBlog);
router.route('/*').get(BlogController.FindOne);

export default router