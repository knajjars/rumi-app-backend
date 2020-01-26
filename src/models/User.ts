import mongoose from 'mongoose';

import { User as UserModel, UserRole } from '../common';

import { ModelReference } from './modelReference';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Tenant },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelReference.Request
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

UserSchema.index({ email: 1 });

const User: mongoose.Model<UserModel> = mongoose.model(ModelReference.User, UserSchema);
export default User;
