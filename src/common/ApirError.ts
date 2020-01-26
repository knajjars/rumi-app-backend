import { HttpStatusCodes } from './dictionary';

export default interface ApiError {
  message: string;
  status: HttpStatusCodes;
}
