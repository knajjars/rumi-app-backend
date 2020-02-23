import { Router } from 'express';

import {
  searchApartments,
  isAuthenticated,
  validate,
  uploadImages,
  addImagesToApartment,
  createApartment
} from '../../middlewares';

import {
  uploadImagePayloadValidation,
  createApartmentPayloadValidation
} from './payloadValidation';

const router = Router();

router.get('/search', isAuthenticated, searchApartments);

router.post('/', isAuthenticated, validate(createApartmentPayloadValidation), createApartment);

router.post(
  '/:apartmentId/upload-images',
  isAuthenticated,
  validate(uploadImagePayloadValidation),
  uploadImages,
  addImagesToApartment
);

export default router;
