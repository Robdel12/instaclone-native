import React, { Component } from 'react';

class CreateUserView extends Component {
  state = {
    emailAddress: '',
    name: '',
    displayName: '',
    profileImage: '',
  }

  get isDisabledBtn() {
    return !this.state.emailAddress && !this.state.name && !this.state.displayName;
  }

  render() {
    if (this.props.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
        <Text>Woah</Text>
    );
  }
}
