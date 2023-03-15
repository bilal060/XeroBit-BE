import { Router } from 'express';
import authRouter from './controllers/auth/auth.routes';
import adminRoutes from './controllers/accounts/accounts.routes';
import blogRouter from './controllers/blogs/blogs.routes'
import serviceRouter from './controllers/services/services.routes'

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRoutes);
router.use('/blog', blogRouter);
router.use('/service', serviceRouter);


export default router;