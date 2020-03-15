import * as React from 'react';
import { Alert } from 'antd';

interface IProps {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = 'Something went wrong',
  description = 'Looks like something went wrong. Please check your connection',
}: IProps) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    ></Alert>
  );
};
