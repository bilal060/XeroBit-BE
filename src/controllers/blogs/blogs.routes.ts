import { Router } from 'express';
import * as BlogController from './blogs.controller';
import * as authMiddleware from '../../middleware/auth'
import { upload } from '../../middleware/fileUpload';

const router = Router();

router.route('').get(BlogController.BlogsList);
router.route('/add').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('blogImage'), BlogController.AddBlog);
router.route('/edit').post(authMiddleware.isAuthorized, authMiddleware.isAdmin, upload.single('blogImage'), BlogController.EditBlog);
router.route('/*').get(BlogController.FindOne);
router.route('/*').delete(authMiddleware.isAuthorized, authMiddleware.isAdmin, BlogController.DeleteBlog);

export default router