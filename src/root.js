import React, { Component } from 'react';
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
import CreatePost from './components/CreatePost';
import CreateUser from './components/CreateUser';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import Logout from './components/Logout';

import ListPageView from './components/presentational/ListPageView';

export default class Root extends Component {
  constructor(props) {
    super(props);
    let _this = this;
    const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciy4kveic00340143rzx2qgck'});

    networkInterface.use([{
      applyMiddleware (req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        AsyncStorage.getItem('auth0IdToken').then((value) => {
          // shout out to my future race condition
          _this.setState({ token: value });

          // get the authentication token from local storage if it exists
          req.options.headers.authorization = `Bearer ${value}`;
          next();
        });
      }
    }]);

    this.client = new ApolloClient({
      networkInterface
    });

    // this is only for better error messages
    checkUri(this.client.networkInterface);

  }

  get isLoggedIn() {
    return this.state && !!this.state.token;
  }

  requireAuth(nextState, replace) {
    if (!this.isLoggedIn) {
      replace({
        pathname: '/feed'
      });
    }
  }

  isUser(nextState, replace) {
    if (nextState.location.state.fromLogin || this.isLoggedIn) {
      replace({
        pathname: '/profile'
      });
    }
  }

  handleToken(token = null) {
    this.setState({token});
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Router history={nativeHistory}>
          <Route path='/' component={(props) => <App isLoggedIn={this.isLoggedIn} handleToken={this.handleToken.bind(this)}>{props.children}</App>}>
            <IndexRoute component={ListPage} />
            <Route path='feed' component={ListPage} />
            <Route path='new' component={CreatePost} onEnter={this.requireAuth.bind(this)} />
            <Route path='signup' component={CreateUser} onEnter={this.isUser.bind(this)} />
            <Route path='profile' component={UserProfile} onEnter={this.requireAuth.bind(this)}>
              <IndexRoute component={UserProfile} />
              <Route path='edit' component={EditProfile} />
            </Route>
            <Route path='logout' component={() => <Logout logout={this.handleToken.bind(this)} />} />
            </Route>
        </Router>
      </ApolloProvider>
    );
  }
}
