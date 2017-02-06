import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CreatePostView from '../components/presentational/CreatePostView';

class CreatePostContainer extends Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object
  }

  render () {
    return <CreatePostView handleSubmit={this.handleSubmit} />;
  }

  handleSubmit = (description, imageUrl) => {
    this.props.mutate({ variables: { description, imageUrl, userId: this.props.data.user.id }})
      .then(() => {
        this.props.router.replace('/');
      });
  }
}

const createPost = gql`
  mutation ($description: String!, $imageUrl: String!, $userId: ID!){
    createPhoto(description: $description, imageUrl: $imageUrl, userId: $userId) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id,
      name,
      displayName,
      profileImage
    }
  }
`;

export default graphql(createPost)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePostContainer))
);
