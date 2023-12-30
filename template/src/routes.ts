import { Router } from 'express';
import { tempRouter } from './modules/temp/temp.route';

const router = Router();

router.use('/', tempRouter);

export default router;
