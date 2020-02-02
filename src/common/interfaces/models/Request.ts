import { Types, Document } from 'mongoose';

import { RequestStatus } from '../../dictionary';

import { User } from './User';

export interface Request extends Document {
  id: Types.ObjectId;
  _owner: Types.ObjectId | User;
  _tenant: Types.ObjectId | User;
  // NOTE add type of conversation
  conversation: Types.ObjectId;
  requestedAt: Date | string;
  status: RequestStatus;
}
