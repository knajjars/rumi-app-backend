import { Router } from 'express';

import { validate, signupUser, loginUser } from '../../middlewares';

import { loginPayloadValidation } from './loginPayloadValidation';
import { signupPayloadValidation } from './signupPayloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), loginUser);

router.post('/signup', validate(signupPayloadValidation), signupUser);

export default router;
