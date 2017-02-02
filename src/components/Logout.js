import React, { Component } from 'react';
import {
  AsyncStorage,
  Text
} from 'react-native';
import { withRouter } from 'react-router';

class Logout extends Component {
  componentDidMount() {
    AsyncStorage.getItem('auth0IdToken').then(token =>{

      if (!token) {
        this.props.router.replace('/');
      }

      // remove token from local storage and reload page to reset apollo client
      AsyncStorage.removeItem('auth0IdToken');
      this.props.router.replace('/');
    });
  }

  render () {
    return <Text>Logging out...</Text>;
  }
}

export default withRouter(Logout);
