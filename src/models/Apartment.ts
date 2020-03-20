import mongoose, { PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { LocationType, ApartmentType, Apartment as ApartmentModel, CurrencyUnit } from '../common';

import { ModelReference } from './modelReference';

const PointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(LocationType),
      default: LocationType.Point,
      required: true
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true
    }
  },
  { _id: false }
);

const ServicesSchema = new mongoose.Schema(
  {
    water: Boolean,
    power: Boolean,
    internet: Boolean,
    parking: Boolean
  },
  { _id: false }
);

const AmenitiesSchema = new mongoose.Schema(
  {
    bed: Number,
    desk: Boolean,
    stove: Boolean,
    fridge: Boolean,
    washingMachine: Boolean
  },
  { _id: false }
);

const ImagesSchema = new mongoose.Schema(
  {
    url: String,
    key: String
  },
  { _id: false }
);

const CurrencySchema = new mongoose.Schema(
  {
    unit: {
      type: String,
      enum: Object.values(CurrencyUnit),
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const ApartmentSchema = new mongoose.Schema(
  {
    _owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelReference.User
    },
    title: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    images: [ImagesSchema],
    description: { type: String, required: false },
    area: { type: Number, required: true },
    price: CurrencySchema,
    deposit: CurrencySchema,
    activateRadius: { type: Boolean, required: true },
    tenantsAllowed: { type: Number },
    apartmentType: {
      type: String,
      enum: Object.values(ApartmentType),
      required: true
    },
    availableFrom: { type: Date, default: new Date() },
    isAvailable: { type: Boolean, default: false },
    isFurnished: { type: Boolean, required: true },
    amenities: AmenitiesSchema,
    location: PointSchema,
    services: ServicesSchema
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  }
);

ApartmentSchema.plugin(mongoosePaginate);

const Apartment: PaginateModel<ApartmentModel> = mongoose.model(
  ModelReference.Apartment,
  ApartmentSchema
);
export default Apartment;
