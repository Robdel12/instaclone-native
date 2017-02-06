import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import Photo from '../presentational/Photo';

import {
  Spinner,
  Button
} from 'native-base';

class UserProfileView extends Component {
  render(){
    if (this.props.data.loading) {
      return <Spinner />;
    }

    if (!this.props.isLoggedIn) {
      return (<Text>You must login to see your profile</Text>);
    }

    if (this.props.data.error) {
      this.props.router.push('/');
    }
    // debugger;
    let user = this.props.data.user;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileInfo}>
            <Text style={{marginRight: 5}}>@{user.displayName}</Text>
            <Button onPress={() => this.props.router.replace('/logout')}>
              Logout
            </Button>
            <Button onPress={() => this.props.router.replace('/profile/edit')}>
              Edit Profile
            </Button>
          </View>
          {this.props.data.user.photos.map(photo => {
            return <Photo key={photo.id} photo={photo} user={this.props.data.user} />;
          })}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  profileInfo: {
    flexDirection: 'row'
  }
});


export default withRouter(UserProfileView);
