require('dotenv').config;

import { MongoClient } from 'mongodb';
import { IDatabase } from '../lib/types';

// TODO: Improve environment variabe management
const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER, DB_NAME, DB_COLLECTION, LOCAL_MONGO_URL, LOCAL_DB_NAME } = process.env;

const dbCollection = `${DB_COLLECTION}`;
let dbName = `${DB_NAME}`;
let url = '';
url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

if (process.env.NODE_ENV == 'LOCAL') {
  url = `${LOCAL_MONGO_URL}`;
  dbName = `${LOCAL_DB_NAME}`;
}

console.log('=====\nConfig for', process.env.NODE_ENV);
console.log('DB: ', dbName);

export const connectDatabase = async (): Promise<IDatabase> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);

  return {
    listings: db.collection(dbCollection),
  };
};
