import { Types } from 'mongoose';

import { Apartment } from '../models';

export interface CreateApartmentRequestPayload extends Omit<Apartment, '_owner'> {}

export interface CreateApartmentResponsePayload {
  apartmentId: Types.ObjectId;
}
