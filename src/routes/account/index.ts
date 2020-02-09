import { Router } from 'express';

import {
  validate,
  signupUser,
  loginUser,
  requestChangeEmail,
  verifyEmail,
  isAuthenticated,
  resetPassword,
  changePassword,
  deleteAccount,
  updateUser,
  getUserIdFromVerificationCode,
  changeEmail
} from '../../middlewares';

import {
  loginPayloadValidation,
  signupPayloadValidation,
  requestChangeEmailPayloadValidation,
  verifyEmailPayloadValidation,
  resetPasswordPayloadValidation,
  changePasswordPayloadValidation,
  updateUserPayloadValidation,
  changeEmailPayloadValidation
} from './payloadValidation';

const router = Router();

router.post('/login', validate(loginPayloadValidation), loginUser);

router.post('/signup', validate(signupPayloadValidation), signupUser);

router.post('/verify-email', validate(verifyEmailPayloadValidation), getUserIdFromVerificationCode, verifyEmail);

router.post(
  '/request-change-email',
  isAuthenticated,
  validate(requestChangeEmailPayloadValidation),
  requestChangeEmail
);

router.post('/change-email', validate(changeEmailPayloadValidation), getUserIdFromVerificationCode, changeEmail);

router.post('/reset-password', validate(resetPasswordPayloadValidation), resetPassword);

router.post(
  '/change-password',
  validate(changePasswordPayloadValidation),
  getUserIdFromVerificationCode,
  changePassword
);

router.post('/update-user', isAuthenticated, validate(updateUserPayloadValidation), updateUser);

router.post('/delete-account', isAuthenticated, deleteAccount);

export default router;
