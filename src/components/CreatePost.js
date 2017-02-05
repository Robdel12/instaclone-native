import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { View, TextInput, Image, Text } from 'react-native';

import {
  Input,
  InputGroup,
  Button
} from 'native-base';

class CreatePost extends Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object
  }

  state = {
    description: '',
    imageUrl: '',
  }

  handleInput(stateKey, text) {
    this.setState({[stateKey]: text});
  }

  render () {
    return (
      <View style={{paddingHorizontal: 20}}>
        <InputGroup>
          <Input
            onChangeText={this.handleInput.bind(this, 'description')}
            placeholder={'Description'} />
        </InputGroup>

        <InputGroup>
          <Input
            onChangeText={this.handleInput.bind(this, 'imageUrl')}
            placeholder={'Image Url'} />
        </InputGroup>

        {this.renderImage()}
        {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    if (this.state.description && this.state.imageUrl) {
      return (
        <Button  onPress={this.handleSubmit.bind(this)} style={{marginTop: 15}}>
          Post
        </Button>
      );
    }

    return null;
  }

  renderImage() {
    if (this.state.imageUrl) {
      return (
        <Image
          source={{ uri: this.state.imageUrl }}
          style={{flex: 0, width: 200, height: 200, marginTop: 15}}
          />
      );
    }
    return null;
  }

  handleSubmit() {
    let { description, imageUrl } = this.state;

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
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
);
