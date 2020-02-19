import { Router } from 'express';

import {
  searchApartments,
  isAuthenticated,
  validate,
  uploadImages,
  addImagesToApartment
} from '../../middlewares';

import { uploadImagePayloadValidation } from './payloadValidation';

const router = Router();

router.get('/search', isAuthenticated, searchApartments);

router.post(
  '/:apartmentId/upload-images',
  isAuthenticated,
  validate(uploadImagePayloadValidation),
  uploadImages,
  addImagesToApartment
);

export default router;
