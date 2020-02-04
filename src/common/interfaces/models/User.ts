import { Types, Document } from 'mongoose';

import { Request } from './Request';

export interface User extends Document {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isActivated: boolean;
  _requests: Types.ObjectId[] | Request[];
}
