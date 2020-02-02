import { Types, Document } from 'mongoose';

import { ApartmentType } from '../../dictionary';

export interface ApartmentAmenities {
  bed: number;
  desk: boolean;
  stove: boolean;
  fridge: boolean;
  washingMachine: boolean;
}

export enum LocationType {
  Point = 'Point'
}

export interface ApartmentLocation {
  type: LocationType;
  coordinates: number[];
}

export interface ApartmentServices {
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
  amenities: ApartmentAmenities;
  location: ApartmentLocation;
  services: ApartmentServices;
}
