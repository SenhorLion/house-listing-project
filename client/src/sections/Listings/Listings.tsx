import React, { FunctionComponent } from "react";
import { useQuery, server } from "../../lib/api";
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
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);

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
      refetch();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const listings = data ? data.listings : null;

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>An Error occcured fetching data, please try again...</h2>;
  }

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
