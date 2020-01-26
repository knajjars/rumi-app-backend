import mongoose from 'mongoose';

import { User as UserModel, UserRole } from '../common';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.Tenant },
    phone: String,
    password: String,
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User: mongoose.Model<UserModel> = mongoose.model('User', UserSchema);
export default User;
