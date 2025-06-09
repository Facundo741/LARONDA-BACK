import { Router } from 'express';
import { getWeeklyActivity } from '../controllers/LeaderBoard.controller';

const router = Router();

router.get('/activos/dias', getWeeklyActivity);

export default router;
