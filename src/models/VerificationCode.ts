import mongoose from 'mongoose';
import shortid from 'shortid';

import { VerificationCode as VerificationCodeModel } from '../common';

import { ModelReference } from './modelReference';

const VerificationCodeSchema = new mongoose.Schema(
  {
    _id: { type: String, default: shortid.generate },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelReference.User
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const VerificationCode: mongoose.Model<VerificationCodeModel> = mongoose.model(
  ModelReference.VerificationCodes,
  VerificationCodeSchema
);
export default VerificationCode;
