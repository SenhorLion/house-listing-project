import { MongoClient } from 'mongodb';
import { IDatabase } from '../lib/types';

const { DB_USER, DB_USER_PASSWORD, DB_CLUSTER } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<IDatabase> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
