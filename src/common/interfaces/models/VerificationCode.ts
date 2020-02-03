import { Types, Document } from 'mongoose';

import { User } from './User';

export interface VerificationCode extends Document {
  _user: Types.ObjectId | User;
}
