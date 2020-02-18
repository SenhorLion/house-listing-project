import React, { FunctionComponent, useState, useEffect } from "react";
import { server } from "../../lib/api";
import {
  Listing,
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log("fetchListings", data.listings);

    setListings(data.listings);
    return data;
  };

  const deleteListings = async (id: string) => {
    try {
      const { data } = await server.fetch<
        DeleteListingData,
        DeleteListingVariables
      >({
        query: DELETE_LISTING,
        variables: {
          id
        }
      });

      console.log("@deleteListings", { data });

      fetchListings();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const listingsList =
    listings && listings.length ? (
      <ul>
        {listings.map(({ id, title }) => (
          <li key={id}>
            {`${id}: ${title}`}
            <button onClick={() => deleteListings(id)}>Delete Listing</button>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        <p>No Listings to show</p>
      </div>
    );

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <h2>Listings</h2>

        {listingsList}
      </div>
    </div>
  );
};
