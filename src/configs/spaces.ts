import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import shortid from 'shortid';
import { Request } from 'express';

import { UploadImagesRequestParams } from '../common';
import { spacesAccessKey as accessKeyId, spacesSecretKey as secretAccessKey } from '../configs';

const spacesEndpoint = (new AWS.Endpoint(
  'https://nyc3.digitaloceanspaces.com'
) as unknown) as string;

const s3 = new AWS.S3({ accessKeyId, secretAccessKey, endpoint: spacesEndpoint });

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rumi',
    // eslint-disable-next-line @typescript-eslint/unbound-method
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, file, cb) => {
      const { apartmentId } = (req.params as unknown) as UploadImagesRequestParams;
      const fileExtension: string = file.originalname.split('.').slice(-1)[0];
      const path: string = `${apartmentId}/${shortid()}.${fileExtension}`;
      cb(null, path);
    }
  })
});
