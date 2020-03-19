import { Router } from 'express';

import {
  searchApartments,
  isAuthenticated,
  validate,
  uploadImages,
  addImagesToApartment,
  createApartment,
  validateApartmentExistance
} from '../../middlewares';

import {
  uploadImagePayloadValidation,
  createApartmentPayloadValidation
} from './payloadValidation';

const router = Router();

router.post('/', isAuthenticated, validate(createApartmentPayloadValidation), createApartment);

router.post(
  '/:apartmentId/upload-images',
  isAuthenticated,
  validate(uploadImagePayloadValidation),
  validateApartmentExistance,
  uploadImages,
  addImagesToApartment
);

router.get('/search', searchApartments);

export default router;
