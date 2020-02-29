require('dotenv').config();

import { ObjectId } from 'mongodb';
import { connectDatabase } from '../src/database';
import { IListing } from '../src/lib/types';

// TODO: Seed Data
// 1. Add Faker data 
// 2. Accept an input number to determine how many to seed
// 3. Create a factory method to construct listing data item
export const listings: IListing[] = [
  {
    _id: new ObjectId(),
    title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
    image: 'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
    address: '3210 Scotchmere Dr W, Toronto, ON, CA',
    price: 10000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 2,
    rating: 5,
  },
  {
    _id: new ObjectId(),
    title: 'Luxurious home with private pool',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
    address: '100 Hollywood Hills Dr, Los Angeles, California',
    price: 15000,
    numOfGuests: 2,
    numOfBeds: 1,
    numOfBaths: 1,
    rating: 4,
  },
  {
    _id: new ObjectId(),
    title: 'Single bedroom located in the heart of downtown San Fransisco',
    image:
      'https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg',
    address: '200 Sunnyside Rd, San Fransisco, California',
    price: 25000,
    numOfGuests: 3,
    numOfBeds: 2,
    numOfBaths: 2,
    rating: 3,
  },
];

const seed = async () => {
  try {
    console.log('[seed] : running...');

    const db = await connectDatabase();

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log('[seed] : finished successfuly...');
  } catch (error) {
    console.log('[error] : failed to seed database', error);
    throw new Error('failed to seed database');
  }
};

// invoke seed to populate database
seed();
