import { Router } from 'express';

const router = Router();

router.post('/login', (_req, res) => {
  res.send('Logged in!');
});

router.post('/signup', (_req, res) => {
  res.send('Signed up!');
});

export default router;
