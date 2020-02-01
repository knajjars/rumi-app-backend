import { Router } from 'express';

import { validate, signupUser, loginUser, changeEmail } from '../../middlewares';

import { loginPayloadValidation } from './loginPayloadValidation';
import { signupPayloadValidation } from './signupPayloadValidation';
import { changeEmailPayloadValidation } from './changeEmailPayloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), loginUser);

router.post('/signup', validate(signupPayloadValidation), signupUser);

router.post('/change-email', validate(changeEmailPayloadValidation), changeEmail);

export default router;
