require('dotenv').config;

import { MongoClient } from 'mongodb';
import { IDatabase, IUser, IListing, IBooking } from '../lib/types';

// TODO: Improve environment variabe management
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER, DB_NAME, LOCAL_MONGO_URL } = process.env;

// const dbCollection = `${DB_COLLECTION}`; // no longer used
let dbName = `${DB_NAME}`; // houselistings
let url = '';
url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

if (process.env.NODE_ENV === 'LOCAL') {
  url = `${LOCAL_MONGO_URL}`;
  // dbName = `${LOCAL_DB_NAME}`;
}

console.log('=====\nConfig for', process.env.NODE_ENV);
console.log('DB: ', dbName);
// console.log('DB_COLLECTION: ', dbCollection);

export const connectDatabase = async (): Promise<IDatabase> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);

  return {
    bookings: db.collection<IBooking>('bookings'),
    listings: db.collection<IListing>('listings'),
    users: db.collection<IUser>('users'),
  };
};
