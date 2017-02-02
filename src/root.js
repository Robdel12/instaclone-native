import React from 'react';
import { AsyncStorage } from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  nativeHistory,
  Route,
  Router,
  IndexRoute,
} from 'react-router-native';
import { checkUri } from './utils';

import App from './components/App';
import ListPage from './components/ListPage';
import CreatePage from './components/CreatePage';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciy4kveic00340143rzx2qgck'}),
});

client.networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    // get the authentication token from local storage if it exists
    if (AsyncStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`;
    }
    next();
  }
}]);

// this is only for better error messages
checkUri(client.networkInterface);

export default (
  <ApolloProvider client={client}>
    <Router history={nativeHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ListPage} />
        <Route path="/create" component={CreatePage} />
      </Route>
    </Router>
  </ApolloProvider>
);
