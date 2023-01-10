import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { Affix, Layout, Spin } from 'antd';
import ApolloClient from 'apollo-boost';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import { LOG_IN } from './lib/graphql/mutations';
import {
  LogIn,
  LogInVariables,
} from './lib/graphql/mutations/LogIn/__generated__/LogIn';
import { IViewer } from './lib/types';
import {
  AppHeader,
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User,
} from './sections';

import * as serviceWorker from './serviceWorker';
import './styles/index.css';

const client = new ApolloClient({
  uri: '/api',
  request: async operation => {
    const token = sessionStorage.getItem('token');
    operation.setContext({
      headers: {
        'X-CSRF-TOKEN': token || '',
      },
    });
  },
});

const initialViewer: IViewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<IViewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogIn, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      console.log('LOGGED IN');
      if (data && data.logIn) {
        setViewer(data.logIn);
      }

      if (data?.logIn?.token) {
        sessionStorage.setItem('token', data.logIn.token);
      } else {
        sessionStorage.removeItem('token');
      }
    },
  });

  const loginRef = useRef(logIn);

  useEffect(() => {
    loginRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout id="app-skeleton" className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching tinyhouse" />
        </div>
      </Layout>
    );
  }

  const loginErrorBanner = error ? (
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later" />
  ) : null;

  return (
    <Router>
      <Layout id="app" className="app-skeleton">
        {loginErrorBanner}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setViewer={setViewer} />}
          />
          <Route
            exact
            path="/user/:id"
            render={props => <User {...props} viewer={viewer} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
