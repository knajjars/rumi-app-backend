import { Types, Document } from 'mongoose';

import { RequestStatus } from '../../dictionary';

export interface Amenities extends Document {
  bed: number;
  desk: boolean;
  stove: boolean;
  fridge: boolean;
  washingMachine: boolean;
}

export interface Point extends Document {
  lon: number;
  lat: number;
}

export interface Services extends Document {
  water: boolean;
  power: boolean;
  internet: boolean;
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
  apartmentType: string;
  availableFrom: Date;
  isAvailable: boolean;
  isFurnished: boolean;
  amenities: Amenities;
  location: Point;
  services: Services;
  conversationId: Types.ObjectId;
  status: RequestStatus;
}
