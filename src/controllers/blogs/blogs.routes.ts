import { Router } from 'express';
import * as BlogController from './blogs.controller';
const router = Router();

router.route('').get(BlogController.BlogsList);
router.route('/add').post(BlogController.AddBlog);
router.route('/edit').post(BlogController.EditBlog);
router.route('/*').get(BlogController.FindOne);

export default router