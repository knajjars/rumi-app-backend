import { Types, Document } from 'mongoose';

import { RequestStatus } from '../../dictionary';

export interface Request extends Document {
  id: Types.ObjectId;
  ownerId: Types.ObjectId;
  tenantId: Types.ObjectId;
  requestedAt: Date | string;
  conversationId: Types.ObjectId;
  status: RequestStatus;
}
