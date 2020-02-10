import { Collection, ObjectId } from 'mongodb';

export interface IListing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface IDatabase {
  listings: Collection<IListing>;
}
