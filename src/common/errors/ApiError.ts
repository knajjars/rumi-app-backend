import { HttpStatusCodes } from '../dictionary';

export class ApiError extends Error {
  message: string;
  status: HttpStatusCodes;

  constructor(message: string, status: HttpStatusCodes) {
    super();
    this.message = message;
    this.status = status;
  }
}
