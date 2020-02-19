import { Types } from 'mongoose';

export interface UploadImagesRequestParams {
  apartmentId: Types.ObjectId;
}

export interface UploadImagesResponsePayload {
  success: boolean;
}
