import React, { FunctionComponent } from "react";
import { server } from "../../lib/api";
import {
  ListingsData,
  DeleteListingVariables,
  DeleteListingData
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
 mutation DeleteListing($id: ID!) {
   deleteListing(id: $id) {
     id
   }
 }`;
interface IProps {
  title: string;
}

export const Listings: FunctionComponent<IProps> = ({ title }: IProps) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log("fetchListings", { data });
  };

  const deleteListings = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "5e411209a0a784db40d81219"
      }
    });

    console.log("@deleteListings", { data });
  };

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListings}>Delete Listing</button>
    </div>
  );
};
