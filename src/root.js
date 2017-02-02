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
import CreateUser from './components/CreateUser';
import Logout from './components/Logout';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciy4kveic00340143rzx2qgck'});
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    AsyncStorage.getItem('auth0IdToken').then((value) => {
      // get the authentication token from local storage if it exists
      req.options.headers.authorization = `Bearer ${value}`;
      next();
    });
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface
});
// this is only for better error messages
checkUri(client.networkInterface);

export default (
  <ApolloProvider client={client}>
    <Router history={nativeHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ListPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/signup" component={CreateUser} />
        <Route path="/logout" component={Logout} />
      </Route>
    </Router>
  </ApolloProvider>
);
