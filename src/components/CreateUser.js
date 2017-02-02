import React from 'react';
import {
  Text,
  AsyncStorage,
} from 'react-native';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateUser extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    emailAddress: '',
    name: '',
    displayName: '',
    profileImage: '',
  }

  get isDisabledBtn() {
    return !this.state.emailAddress && !this.state.name && !this.state.displayName;
  }

  render () {
    if (this.props.data.loading) {
      return <Text>Loading...</Text>;
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || AsyncStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in');
      this.props.router.replace('/');
    }

    return (
      <Text>Woah</Text>
    );
  }

  createUser = () => {
    const variables = {
      idToken: AsyncStorage.getItem('auth0IdToken'),
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      displayName: this.state.displayName,
      profileImage: this.state.profileImage
    };

    this.props.createUser({ variables })
      .then((response) => {
        this.props.router.push('/');
      }).catch((e) => {
        console.error(e);
        // lol handle errors
        this.props.router.push('/');
      });
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $displayName: String!, $profileImage: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, displayName: $displayName, profileImage: $profileImage) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(withRouter(CreateUser))
);
