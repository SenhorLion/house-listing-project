require('dotenv').config();

import yargs from 'yargs';
import { ObjectId } from 'mongodb';
import faker from 'faker';
import { connectDatabase } from '../src/database';
import { IListing } from '../src/lib/types';

const createListing = ():IListing => {
  return ({
    _id: new ObjectId(),
    title: faker.lorem.paragraph(1),
    image: faker.internet.avatar(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.countryCode()}`,
    price: parseInt(faker.commerce.price(), 10),
    numOfGuests: faker.random.number(6),
    numOfBeds: faker.random.number(4),
    numOfBaths: faker.random.number(3),
    rating: faker.random.number(4) + 1,
  })
}

const seed = async () => {
  const seedNumber:number = yargs.argv.SEED_NUMBER ? Number(yargs.argv.SEED_NUMBER) : 5;

  console.log('SEED_NUMBER', seedNumber);

  // create seed listings
  let listings:IListing[] = [];

  for (let index = 0; index <= seedNumber; index++) {
    listings.push(createListing())
  }

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
