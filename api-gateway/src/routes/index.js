import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.render('index', { title: 'Express' });
});

export default router;
