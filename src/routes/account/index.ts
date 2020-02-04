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
  deleteAccount,
  updateUser
} from '../../middlewares';

import {
  loginPayloadValidation,
  signupPayloadValidation,
  changeEmailPayloadValidation,
  verifyEmailPayloadValidation,
  resetPasswordPayloadValidation,
  changePasswordPayloadValidation,
  updateUserPayloadValidation
} from './payloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), loginUser);

router.post('/signup', validate(signupPayloadValidation), signupUser);

router.post('/verify-email', validate(verifyEmailPayloadValidation), verifyEmail);

router.post('/change-email', isAuthenticated, validate(changeEmailPayloadValidation), changeEmail);

router.post('/reset-password', validate(resetPasswordPayloadValidation), resetPassword);

router.post('/change-password', validate(changePasswordPayloadValidation), changePassword);

router.post('/update-user', isAuthenticated, validate(updateUserPayloadValidation), updateUser);

router.post('/delete-account', isAuthenticated, deleteAccount);

export default router;
