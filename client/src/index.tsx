import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Affix, Layout } from 'antd';
import { IViewer } from './lib/types';
import {
  AppHeader,
  Home,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
} from './sections';

import './styles/index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/api',
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

  console.log({ viewer });

  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader />
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
          <Route exact path="/user/:id" component={User} />
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
