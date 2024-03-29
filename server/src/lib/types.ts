import { Collection, ObjectId } from 'mongodb';

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export interface BookingsIndexMonth {
  [key: string]: boolean;
}
export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}
export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}

export interface IBooking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkin: string;
  checkOut: string;
}
export interface IListing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
}
export interface IUser {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorized?: boolean;
}

export interface IViewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export interface IDatabase {
  bookings: Collection<IBooking>;
  listings: Collection<IListing>;
  users: Collection<IUser>;
}
