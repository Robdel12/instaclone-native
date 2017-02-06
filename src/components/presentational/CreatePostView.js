import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';

import {
  Input,
  InputGroup,
  Button
} from 'native-base';

export default class CreatePost extends Component {
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

    this.props.handleSubmit(description, imageUrl);
  }
}
