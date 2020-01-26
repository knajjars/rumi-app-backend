import { HttpStatusCodes } from '..';

export interface ApiError {
  message: string;
  status: HttpStatusCodes;
}
