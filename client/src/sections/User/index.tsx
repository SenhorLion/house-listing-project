import { useQuery } from '@apollo/react-hooks';
import { Col, Layout, Row } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import { USER } from '../../lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from '../../lib/graphql/queries/User/__generated__/User';
import { IViewer } from '../../lib/types';
import { UserProfile } from './components';

interface IUserProps {
  viewer: IViewer;
}
interface MatchParams {
  id: string;
}
// TODO: Use react-router hooks to get id param
export const User = ({
  match,
  viewer,
}: IUserProps & RouteComponentProps<MatchParams>) => {
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

  console.log({ loading }, { error });

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
      </Content>
    );
  }

  const user = data && data?.user ? data.user : null;
  const viewerIsUser = viewer?.id === id;

  return (
    <Content className="user">
      <Row gutter={12} justify="space-between">
        <Col xs={24}>
          <UserProfile user={user} viewerIsUser={viewerIsUser} />
        </Col>
      </Row>
    </Content>
  );
};
