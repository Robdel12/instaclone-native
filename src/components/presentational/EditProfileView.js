import React, { Component } from 'react';
import {
  View
} from 'react-native';

import {
  Input,
  InputGroup,
  Spinner,
  Button,
} from 'native-base';

export default class EditProfileView extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user) {
      this.setState({
        displayName: nextProps.data.user.displayName,
        name: nextProps.data.user.name,
        profileImage: nextProps.data.user.profileImage,
        emailAddress: nextProps.data.user.emailAddress
      });
    }
  }

  state = {
    displayName: '',
    name: '',
    profileImage: '',
    emailAddress: ''
  }

  setInput = (stateKey, value) => {
    this.setState({[stateKey]: value});
  }

  handleSubmit() {
    let { displayName, name, profileImage, emailAddress } = this.state;

    this.props.handleSubmit(displayName, name, profileImage, emailAddress);
  }

  render() {
    if (!this.props.data.user) {
      return <Spinner />;
    }

    return (
      <View style={{paddingHorizontal: 20}}>
        <InputGroup>
          <Input
            onChangeText={this.setInput.bind(this, 'displayName')}
            value={this.state.displayName}
            placeholder={'@somebody'}
            />
        </InputGroup>

        <InputGroup>
          <Input
            onChangeText={this.setInput.bind(this, 'name')}
            value={this.state.name}
            placeholder={'Jimmy doe'}
            />
        </InputGroup>

        <InputGroup>
          <Input
            onChangeText={this.setInput.bind(this, 'profileImage')}
            value={this.state.profileImage}
            placeholder={'example.com/profileimage.jpg'}
            />
        </InputGroup>

        <InputGroup>
          <Input
            onChangeText={this.setInput.bind(this, 'emailAddress')}
            value={this.state.emailAddress}
            placeholder={'jimmy@example.com'}
            />
        </InputGroup>

        <Button onPress={this.handleSubmit.bind(this)} style={{marginTop: 15}}>
          Update Profile
        </Button>
      </View>
    );
  }
}
