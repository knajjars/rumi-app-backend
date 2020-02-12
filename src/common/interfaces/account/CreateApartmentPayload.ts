export interface CreateApartmentRequestPayload {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateApartmentResponsePayload {
  message: string;
}
