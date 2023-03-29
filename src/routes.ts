import { Router } from 'express';
import authRouter from './controllers/auth/auth.routes';
import adminRoutes from './controllers/accounts/accounts.routes';
import blogRouter from './controllers/blogs/blogs.routes'
import serviceRouter from './controllers/services/services.routes'
import projectRouter from './controllers/Projects/projects.routes'

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRoutes);
router.use('/blog', blogRouter);
router.use('/service', serviceRouter);
router.use('/project', projectRouter);


export default router;