import { Router } from 'express';

import { validate } from '../../middlewares';

import { loginPayloadValidation } from './loginPayloadValidation';
import { signupPayloadValidation } from './signupPayloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), (_req, res) => {
  res.send('Logged in!');
});

router.post('/signup', validate(signupPayloadValidation), (_req, res) => {
  res.send('Signed up!');
});

export default router;
