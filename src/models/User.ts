import mongoose from 'mongoose';

import { User as UserModel } from '../common';

import { ModelReference } from './modelReference';

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    _requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ModelReference.Request
      }
    ]
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

UserSchema.index({ email: 1 });

const User: mongoose.Model<UserModel> = mongoose.model(ModelReference.User, UserSchema);
export default User;
