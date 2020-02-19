import multer from 'multer';
import multerS3 from 'multer-s3';
import shortid from 'shortid';
import { Request } from 'express';

import { UploadImagesRequestParams, ApiError, HttpStatusCodes } from '../../common';
import { spaces } from '../../configs';

const MAX_COUNT: number = 30;

export const uploadImages = multer({
  fileFilter: (_req, file, cb) => {
    if (
      !file.mimetype.includes('jpeg') &&
      !file.mimetype.includes('jpg') &&
      !file.mimetype.includes('png')
    ) {
      return cb(new ApiError('Only images are allowed', HttpStatusCodes.UnsupportedMediaType));
    }
    cb(null, true);
  },
  storage: multerS3({
    s3: spaces,
    bucket: 'rumi',
    // eslint-disable-next-line @typescript-eslint/unbound-method
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file, upload) => {
      const { apartmentId } = (req.params as unknown) as UploadImagesRequestParams;

      const fileExtension: string = file.originalname.split('.').slice(-1)[0];
      const path: string = `${apartmentId}/${shortid()}.${fileExtension}`;

      upload(null, path);
    }
  })
}).array('photos', MAX_COUNT);
