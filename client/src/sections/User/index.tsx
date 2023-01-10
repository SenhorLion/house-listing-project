import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';

interface IUserProps {
  id: string;
}
// TODO: Use react-router hooks to get id param
export const User = ({ match }: RouteComponentProps<IUserProps>) => {
  // const { id } = useParams();
  const { Content } = Layout;
  const {
    params: { id },
  } = match;

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id,
    },
  });

  console.log({ data });

  const user = data && data?.user ? data.user : null;
  const userProfileElement = user ? <h2>USER</h2> : null;

  return (
    <Content className="user">
      <Row gutter={12} type="flex" justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
      </Row>
    </Content>
  );
};
