import merge from 'lodash.merge';

import { listingResolvers } from './Listing';
import { userResolvers } from './User';

export const resolvers = merge(listingResolvers, userResolvers);
