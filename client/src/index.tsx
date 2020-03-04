import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Host, Listing, Listings, NotFound, User } from './sections';

import './styles/index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/api',
});

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/host" component={Host}></Route>
        <Route exact path="/listing/:id" component={Listing}></Route>
        <Route exact path="/listings/:location?" component={Listings}></Route>
        <Route exact path="/User" component={User}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
};

{
  /* <Listings title="House Listings" /> */
}

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
