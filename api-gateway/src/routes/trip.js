import { Router } from 'express';
import { list, suggestion } from 'controller/trip';

const router = Router();

/* GET list of trips by filter */
router.get('/', list);

/* GET list of suggestion trips by filter */
router.get('/suggestion', suggestion);

export default router;
