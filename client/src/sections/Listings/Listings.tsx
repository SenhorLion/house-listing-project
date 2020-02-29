import React, { FunctionComponent } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { useQuery, useMutation } from "../../lib/api";

import { Alert, List, Avatar, Button, Spin } from 'antd';

import { ListingsSkeleton } from './components/ListingsSkeleton';

import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';

import './styles/Listings.css';

// NB: WE must name all our GraphQL requests!
// For the Apollo code generator to pick up the GraphQL documents
// and make static types that reference them, it requires us to name all our GraphQL requests,
// E.g: query Listings { ... } as appears here:
const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;
interface IProps {
  title: string;
}

export const Listings: FunctionComponent<IProps> = ({ title }: IProps) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });

    // console.log('@handleDeleteListing', { id });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList =
    listings && listings.length ? (
      <List
        itemLayout="horizontal"
        dataSource={listings}
        renderItem={listing => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => handleDeleteListing(listing.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={listing.title}
              description={listing.address}
              avatar={<Avatar src={listing.image} shape="square" size={48} />}
            />
          </List.Item>
        )}
      />
    ) : (
      <div>
        <p>No Listings to show</p>
      </div>
    );

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="An Error occcured please try again..."
      className="listings__alert"
    />
  ) : null;

  return (
    <div className="listings">
      {deleteListingErrorAlert}
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        <div>{listingsList}</div>
      </Spin>
    </div>
  );
};
