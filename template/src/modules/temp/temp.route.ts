import { Router } from 'express';
import { sendMessage } from './temp.controller';

const router = Router();

router.get('/', sendMessage);

export const tempRouter = router;
