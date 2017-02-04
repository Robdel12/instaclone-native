import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import Auth0Lock from 'react-native-lock';
import { withRouter } from 'react-router-native';
import {
  Button,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';

import {
  AUTH_0_CLIENT_ID,
  AUTH_0_DOMAIN
} from '../env';

const lock = new Auth0Lock({
  clientId: AUTH_0_CLIENT_ID,
  domain: AUTH_0_DOMAIN
});

class Navigation extends Component {
  handlePress(path) {
    this.props.router.replace(path);
  }

  showLogin() {
    lock.show({}, (error, profile, token ) => {
      if (error) {
        console.log(error);
        return;
      }

      AsyncStorage.setItem('auth0IdToken', token.idToken);
      this.props.handleToken(token.idToken);
      this.props.router.replace({
        pathname:`/signup`,
        state: { fromLogin: true }
      });
    });
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.handlePress.bind(this, '/')}>
            Home
            <Icon name='ios-apps-outline' />
          </Button>
          {this.renderUserNav()}
        </FooterTab>
      </Footer>
    );
  }

  renderUserNav() {
    if (!this.props.isLoggedIn) {
      return (
        <Button onPress={this.showLogin.bind(this)}>
          Login
          <Icon name='ios-contact-outline' />
        </Button>
      );
    }

    let newPostBtn = (
      <Button key="newpost" onPress={this.handlePress.bind(this, '/new')}>
        New Post
        <Icon name='ios-camera-outline' />
      </Button>
    );

    let profileBtn = (
      <Button key="profile" onPress={this.handlePress.bind(this, '/profile')}>
        Profile
        <Icon name='ios-contact-outline' />
      </Button>
    );

    return [newPostBtn, profileBtn];
  }
}

export default withRouter(Navigation);
