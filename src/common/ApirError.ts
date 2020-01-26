import { HttpStatusCodes } from '.';

export default interface ApiError {
  message: string;
  status: HttpStatusCodes;
}
