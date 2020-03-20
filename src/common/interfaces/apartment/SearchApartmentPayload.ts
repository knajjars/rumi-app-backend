import { PaginateResult } from 'mongoose';

import { ApartmentType } from '../../../common';
import { ApartmentAmenities, ApartmentServices, Apartment } from '../models';

export interface Pagination {
  limit: number;
  offset: number;
}
export interface SearchApartmentRequestQuery {
  pagination: Pagination;
  bedrooms?: number;
  area?: number;
  minPrice?: number;
  maxPrice?: number;
  tenantsAllowed?: number;
  apartmentType?: ApartmentType;
  availableFrom?: string;
  isFurnished?: boolean;
  amenities: ApartmentAmenities;
  services: ApartmentServices;
  coordinates: number[];
}

export interface SearchApartmentResponsePayload extends PaginateResult<Apartment> {}
