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
import ListPageContainer from './components/ListPageContainer';
import CreatePostContainer from './components/CreatePostContainer';
import CreateUserContainer from './components/CreateUserContainer';
import UserProfileContainer from './components/UserProfileContainer';
import EditProfileContainer from './components/EditProfileContainer';
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
            <IndexRoute component={ListPageContainer} />
            <Route path='feed' component={ListPageContainer} />
            <Route path='new' component={CreatePostContainer} onEnter={this.requireAuth.bind(this)} />
            <Route path='signup' component={CreateUserContainer} onEnter={this.isUser.bind(this)} />
            <Route path='profile'component={ProfileComponent} onEnter={this.requireAuth.bind(this)}>
              <IndexRoute component={UserProfileContainer} />
              <Route path='edit' component={EditProfileContainer} />
            </Route>
            <Route path='logout' component={() => <Logout logout={this.handleToken.bind(this)} />} />
          </Route>
        </Router>
      </ApolloProvider>
    );
  }
}

// Hack to get around router requiring a component in native?
// Web react router doesn't need a component prop on block components
const ProfileComponent = (props) => {
  return props.children;
};
