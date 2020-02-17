import React, { FunctionComponent, useState, useEffect } from "react";
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
  const [listingsState, setListingsState] = useState<ListingsData>({listings: []});
  
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log("fetchListings", { data });

    setListingsState(data);
    return data;
  };

  const deleteListings = async () => {
    try {
      const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "5e48554611650099050ac819"
      }
    });

    console.log("@deleteListings", { data });

    fetchListings();
    } catch (error) {
      console.log('Error', error)
    }
    
  };

  useEffect(() => {
    fetchListings();
  }, [])

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListings}>Delete Listing</button>

      <div>
        <h2>Listings</h2>
        {listingsState && listingsState.listings && listingsState.listings.length ? (
        <ul>{
        listingsState.listings.map(({id, title}) => <li key={id}>{`${id}: ${title}`}</li>)
          }
          </ul>
        ) : (
          <div><p>No Listings to show</p></div>
        )}
      </div>
    </div>
  );
};
