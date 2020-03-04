require('dotenv').config();

import yargs from 'yargs';
import { ObjectId } from 'mongodb';
import faker from 'faker';
import { connectDatabase } from '../src/database';
import { IListing, ListingType } from '../src/lib/types';
import { listings } from './listings';
import { users } from './users';

const createListingType = (): ListingType => {
  return faker.random.number(1) === 0 ? ListingType.Apartment : ListingType.House;
};
const createListing = (): IListing => {
  return {
    _id: new ObjectId(),
    title: faker.lorem.paragraph(1),
    description: faker.lorem.paragraph(1),
    image: faker.internet.avatar(),
    host: faker.random.alphaNumeric(),
    type: createListingType(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.countryCode()}`,
    country: faker.address.country(),
    admin: faker.address.state(),
    city: faker.address.city(),
    bookings: [],
    bookingsIndex: {},
    price: parseInt(faker.commerce.price(), 10),
    numOfGuests: faker.random.number(6),
  };
};

const seed = async () => {
  const seedNumber: number = yargs.argv.SEED_NUMBER ? Number(yargs.argv.SEED_NUMBER) : 5;

  console.log('SEED_NUMBER', seedNumber);

  // create seed listings
  let mockListings: IListing[] = [];

  for (let index = 0; index <= seedNumber; index++) {
    mockListings.push(createListing());
  }

  console.log('@MADEUP_LISTINGS', { mockListings });

  try {
    console.log('[seed] : running...');

    const db = await connectDatabase();

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log('[seed] : finished successfuly...');
  } catch (error) {
    console.log('[error] : failed to seed database', error);
    throw new Error('failed to seed database');
  }
};

// invoke seed to populate database
seed();
