import React, { Component, PropTypes } from 'react';
import { AsyncStorage, TouchableHighlight, Text } from 'react-native';
import Auth0Lock from 'react-native-lock';
import { withRouter } from 'react-router-native';
import {
  AUTH_0_CLIENT_ID,
  AUTH_0_DOMAIN
} from '../env';

import {
  Button,
  Icon
} from 'native-base';

const lock = new Auth0Lock({
  clientId: AUTH_0_CLIENT_ID,
  domain: AUTH_0_DOMAIN
});

class LoginAuth0 extends Component {

  static propTypes = {
    router: PropTypes.object.isRequired
  }

  showLogin() {
    console.log(lock);
    lock.show({}, (error, profile, token ) => {
      if (error) {
        console.log(error);
        return;
      }

      AsyncStorage.setItem('auth0IdToken', token.idToken);
      this.props.router.push(`/signup`);
    });
  }

  render() {
    return (
      <Button onPress={this.showLogin.bind(this)} transparent>
        {this.props.children}
      </Button>
    );
  }
}

export default withRouter(LoginAuth0);
