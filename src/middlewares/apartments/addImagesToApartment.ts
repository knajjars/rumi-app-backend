import { RequestHandler } from 'express';

import { UploadImagesResponsePayload, HttpStatusCodes } from '../../common';

export const addImagesToApartment: RequestHandler = (req, res, _next) => {
  const files: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
  files.forEach(file => console.log(file));
  const response: UploadImagesResponsePayload = { success: true };
  res.status(HttpStatusCodes.Ok).json(response);
};
