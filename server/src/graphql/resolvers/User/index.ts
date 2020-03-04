import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { IDatabase, IUser } from '../../../lib/types';

export const userResolvers: IResolvers = {
  Query: {
    users: async (_root: undefined, args: {}, { db }: { db: IDatabase }): Promise<IUser[]> => {
      return await db.users.find({}).toArray();
    },
  },
  User: {
    id: (user: IUser): string => user._id.toString(),
  },
};
