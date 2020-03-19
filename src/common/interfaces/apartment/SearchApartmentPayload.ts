import { ApartmentType } from '../../../common';
import { ApartmentAmenities, ApartmentServices, Apartment } from '../models';

export interface SearchApartmentRequestQuery {
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

export interface SearchApartmentResponsePayload {
  count: number;
  limit: number;
  offset: number;
  results: Apartment[];
}
