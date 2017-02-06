import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-native';
import UserProfileView from '../components/presentational/UserProfileView';

class UserProfileContainer extends Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  get isLoggedIn() {
    return this.props.data.user;
  }

  render () {
    return <UserProfileView data={this.props.data} isLoggedIn={this.isLoggedIn} />;
  }
}

const FeedQuery = gql`query {
  user {
    id,
    name,
    displayName,
    profileImage,
    photos(orderBy: createdAt_DESC) {
      id,
      description,
      imageUrl,
      createdAt
    }
  }
}`;

export default graphql(FeedQuery)(withRouter(UserProfileContainer));
