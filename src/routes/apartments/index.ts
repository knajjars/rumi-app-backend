import { Router } from 'express';

import { upload } from '../../configs/spaces';
import { searchApartments, isAuthenticated, validate } from '../../middlewares';

import { uploadImagePayloadValidation } from './payloadValidation';

const router = Router();

router.get('/search', isAuthenticated, searchApartments);

router.post(
  '/:apartmentId/upload-images',
  isAuthenticated,
  validate(uploadImagePayloadValidation),
  upload.array('photos'),
  (_req, res) => {
    res.status(200).json({ success: true });
  }
);

export default router;
