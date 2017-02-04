import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { View, TextInput, Button, Image, Text } from 'react-native';

class CreatePost extends Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
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
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleInput.bind(this, 'description')}
          placeholder={'Description'} />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleInput.bind(this, 'imageUrl')}
          placeholder={'Image Url'} />

        {this.renderImage()}
        {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    if (this.state.description && this.state.imageUrl) {
      return (
        <Button title={'Post'} onPress={this.handleSubmit} />
      );
    }

    return null;
  }

  renderImage() {
    if (this.state.imageUrl) {
      return (
        <Image
          source={{ uri: this.state.imageUrl }}
          style={{flex: 1, width: 200, height: 200}}
          />
      );
    }
    return null;
  }

  handleSubmit = () => {
    const {description, imageUrl} = this.state;

    this.props.mutate({variables: {description, imageUrl}})
      .then(() => {
        this.props.router.push('/');
      });
  }
}

const addMutation = gql`
  mutation ($description: String!, $imageUrl: String!){
    createPost(description: $description, imageUrl: $imageUrl) {
      id
    }
  }
`

const PostWithMutation = graphql(addMutation)(withRouter(CreatePost));

export default PostWithMutation;
