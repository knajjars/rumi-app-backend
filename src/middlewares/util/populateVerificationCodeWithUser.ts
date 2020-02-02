import { VerificationCodeModel } from '../../models';
import { VerificationCode, ApiError, HttpStatusCodes } from '../../common';

export async function populateVerificationCodeWithUser(code: string): Promise<VerificationCode> {
  try {
    const verificationCode: VerificationCode | null = await VerificationCodeModel.findById(code).populate('_user');
    if (verificationCode === null) {
      throw new ApiError('Verification code is not valid', HttpStatusCodes.BadRequest);
    }
    return verificationCode;
  } catch (err) {
    throw new Error(err);
  }
}
