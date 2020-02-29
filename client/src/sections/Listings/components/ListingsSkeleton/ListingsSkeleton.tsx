import React from 'react';
import { Alert, Skeleton, Divider } from 'antd';
import './styles/ListingsSkeleton.css';

interface IProps {
  title: string;
  error?: boolean;
}

// TODO: Accept number prop to determine how many Skeleton items to have
export const ListingsSkeleton = ({ title, error = false }: IProps) => {
  const errorAlert = error ? (
    <Alert
      type="error"
      message="An Error occcured fetching data, please try again..."
      className="listings-skeleton__alert"
    />
  ) : null;
  return (
    <div className="listings-skeleton">
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
