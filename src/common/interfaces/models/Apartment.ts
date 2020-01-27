import { Types, Document } from 'mongoose';

import { RequestStatus, ApartmentType } from '../../dictionary';

export interface Amenities {
  bed: number;
  desk: boolean;
  stove: boolean;
  fridge: boolean;
  washingMachine: boolean;
}

export enum LocationType {
  Point = 'Point'
}

export interface Location {
  type: LocationType;
  coordinates: number[];
}

export interface Services {
  water: boolean;
  power: boolean;
  internet: boolean;
  parking: boolean;
}

export interface Apartment extends Document {
  id: Types.ObjectId;
  ownerId: Types.ObjectId;
  title: string;
  bedrooms: number;
  images: string[];
  description: string;
  area: number;
  price: number;
  deposit: number;
  activateRadius: boolean;
  tenantsAllowed: number;
  apartmentType: ApartmentType;
  availableFrom: Date;
  isAvailable: boolean;
  isFurnished: boolean;
  amenities: Amenities;
  location: Location;
  services: Services;
}
