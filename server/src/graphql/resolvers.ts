import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

// A copy of [listings] so we can mutate it in memory
let filteredListings = [...listings];

export const resolvers: IResolvers = {
  Query: {
    listings: () => filteredListings
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      const listing = filteredListings.find(item => item.id === id);

      if (!listing) {
        throw new Error("Failed to find listing");
      }
      // remove from listings
      filteredListings = filteredListings.filter(item => item.id !== id);

      return listing;
    }
  }
};
