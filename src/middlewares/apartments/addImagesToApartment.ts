import { RequestHandler } from 'express';

import { ApartmentModel } from '../../models';

import {
  UploadImagesResponsePayload,
  HttpStatusCodes,
  UploadImagesRequestParams,
  Apartment,
  ApartmentImage,
  ApiError
} from '../../common';

export const addImagesToApartment: RequestHandler = async (req, res, next) => {
  const {
    apartmentId
  }: UploadImagesRequestParams = (req.params as unknown) as UploadImagesRequestParams;

  try {
    const apartment: Apartment = (await ApartmentModel.findById(apartmentId)) as Apartment;

    const apartmentImages: ApartmentImage[] = [];

    const files: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];
    files.forEach(file => apartmentImages.push({ url: file.location, key: file.key }));

    await apartment.update({ $push: { images: apartmentImages } });

    const response: UploadImagesResponsePayload = { success: true };
    res.status(HttpStatusCodes.Ok).json(response);
  } catch (err) {
    const error = new ApiError(err.message, HttpStatusCodes.ServerError);
    next(error);
  }
};
