require('dotenv').config();

import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    console.log('[clear] : running...');

    const db = await connectDatabase();

    const bookings = await db.bookings.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (bookings.length) {
      db.bookings.drop();
    }

    if (listings.length) {
      db.listings.drop();
    }

    if (users.length) {
      db.users.drop();
    }

    console.log('[clear] : finished successfuly...');
  } catch (error) {
    console.log('[error] : failed to clear database', error);
    throw new Error('failed to seed database');
  }
};

// invoke seed to populate database
clear();
