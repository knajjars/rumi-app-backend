import { Types, Document } from 'mongoose';

export interface VerificationCode extends Document {
  userId: Types.ObjectId;
}
