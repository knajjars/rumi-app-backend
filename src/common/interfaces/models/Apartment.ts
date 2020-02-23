import { Types, Document } from 'mongoose';

import { ApartmentType, CurrencyUnit } from '../../dictionary';

import { User } from './User';

export interface ApartmentAmenities {
  bed?: number;
  desk?: boolean;
  stove?: boolean;
  fridge?: boolean;
  washingMachine?: boolean;
}

export enum LocationType {
  Point = 'Point'
}

export interface ApartmentLocation {
  type: LocationType;
  coordinates: number[];
}

export interface ApartmentServices {
  water?: boolean;
  power?: boolean;
  internet?: boolean;
  parking?: boolean;
}

export interface ApartmentImage {
  url: string;
  key: string;
}

export interface ApartmentCurrency {
  unit: CurrencyUnit;
  value: number;
}

export interface Apartment extends Document {
  id: Types.ObjectId;
  _owner: Types.ObjectId | User;
  title: string;
  bedrooms: number;
  area: number;
  price: ApartmentCurrency;
  deposit: ApartmentCurrency;
  activateRadius: boolean;
  apartmentType: ApartmentType;
  availableFrom: Date;
  isAvailable: boolean;
  isFurnished: boolean;
  location: ApartmentLocation;
  tenantsAllowed?: number;
  images: ApartmentImage[];
  description?: string;
  amenities?: ApartmentAmenities;
  services?: ApartmentServices;
}
