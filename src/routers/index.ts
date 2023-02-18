import { Router } from "express";
import UserRouter from './user.route';

const router = Router();
router.use('/users', UserRouter);

export default router;