import { Router } from 'express';

import {
  validate,
  signupUser,
  loginUser,
  changeEmail,
  verifyEmail,
  isAuthenticated,
  resetPassword,
  changePassword,
  deleteAccount
} from '../../middlewares';

import { loginPayloadValidation } from './loginPayloadValidation';
import { signupPayloadValidation } from './signupPayloadValidation';
import { changeEmailPayloadValidation } from './changeEmailPayloadValidation';
import { verifyEmailPayloadValidation } from './verifyEmailPayloadValidation';
import { resetPasswordPayloadValidation } from './resetPasswordPayloadValidation';
import { changePasswordPayloadValidation } from './changePasswordPayloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), loginUser);

router.post('/signup', validate(signupPayloadValidation), signupUser);

router.post('/verify-email', validate(verifyEmailPayloadValidation), verifyEmail);

router.post('/change-email', isAuthenticated, validate(changeEmailPayloadValidation), changeEmail);

router.post('/reset-password', validate(resetPasswordPayloadValidation), resetPassword);

router.post('/change-password', validate(changePasswordPayloadValidation), changePassword);

router.post('/delete-account', isAuthenticated, deleteAccount);

export default router;
