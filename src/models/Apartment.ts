import mongoose from 'mongoose';

import { LocationType, ApartmentType, Apartment as ApartmentModel } from '../common';

import { ModelReference } from './modelReference';

const PointSchema = new mongoose.Schema({
  type: { type: String, enum: [LocationType.Point], default: LocationType.Point, required: true },
  coordinates: {
    type: [Number],
    index: '2dsphere',
    required: true
  }
});

const ServicesSchema = new mongoose.Schema({
  water: Boolean,
  power: Boolean,
  internet: Boolean,
  parking: Boolean
});

const AmenitiesSchema = new mongoose.Schema({
  bed: Number,
  desk: Boolean,
  stove: Boolean,
  fridge: Boolean,
  washingMachine: Boolean
});

const ApartmentSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelReference.User
    },
    title: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String, required: false },
    area: { type: Number },
    price: { type: Number },
    deposit: { type: Number },
    activateRadius: { type: Boolean },
    tenantsAllowed: { type: Number },
    apartmentType: { type: String, enum: Object.values(ApartmentType), default: ApartmentType.PrivateRoom },
    availableFrom: { type: Date, default: new Date() },
    isAvailable: Boolean,
    isFurnished: Boolean,
    amenities: AmenitiesSchema,
    location: PointSchema,
    services: ServicesSchema
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Apartment: mongoose.Model<ApartmentModel> = mongoose.model(ModelReference.Apartment, ApartmentSchema);
export default Apartment;
