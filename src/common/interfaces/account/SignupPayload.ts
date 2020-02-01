export interface SignupRequestPayload {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SignupResponsePayload {
  message: string;
}
