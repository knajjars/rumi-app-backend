import { Types, Document } from 'mongoose';

import { UserRole } from '../../dictionary';

import { Request } from '.';

export interface User extends Document {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
  password: string;
  requersts: Request[];
}
