import React, { FunctionComponent } from "react";
import { useQuery, useMutation } from "../../lib/api";
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables
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

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    try {
      await deleteListing({ id });

      console.log("@handleDeleteListing", { id });
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
            <button onClick={() => handleDeleteListing(id)}>
              Delete Listing
            </button>
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

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Deletion error, please try again.</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <h2>Listings</h2>

        {listingsList}
        {deleteListingLoadingMessage}
        {deleteListingErrorMessage}
      </div>
    </div>
  );
};
