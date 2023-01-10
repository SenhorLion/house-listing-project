import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import { IDatabase, IUser } from '../../../lib/types';
import { authorize } from '../../../lib/utils';
import { IUserArgs } from './types';

interface IUserContext {
  db: IDatabase;
  req: Request;
}

export const userResolvers: IResolvers = {
  Query: {
    user: async (_root: undefined, { id }: IUserArgs, { db, req }: IUserContext): Promise<IUser> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error('User not found');
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: IUser): string => {
      return user?._id;
    },
    hasWallet: (user: IUser): boolean => {
      return Boolean(user?.walletId);
    },
    income: (user: IUser): number | null => {
      return user?.authorized ? user.income : null;
    },
    bookings: () => {},
    listings: () => {},
  },
};
