import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { IDatabase, IListing } from '../../../lib/types';

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (_root: undefined, args: {}, { db }: { db: IDatabase }): Promise<IListing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (_root: undefined, { id }: { id: string }, { db }: { db: IDatabase }): Promise<IListing> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResult.value) {
        throw new Error('Failed to delete listing');
      }

      return deleteResult.value;
    },
  },
  Listing: {
    id: (listing: IListing): string => listing._id.toString(),
  },
};
