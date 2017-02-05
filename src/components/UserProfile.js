import React, { Component } from 'react';
import Photo from '../components/presentational/Photo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-native';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import {
  Spinner,
  Button
} from 'native-base';

class UserProfile extends Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  get isLoggedIn() {
    return this.props.data.user;
  }

  render () {
    let user = this.props.data.user;

    if (this.props.data.loading) {
      return <Spinner />;
    }

    if (!this.isLoggedIn) {
      return (<Text>You must login to see your profile</Text>);
    }

    if (this.props.data.error) {
      this.props.router.push('/');
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profileInfo}>
            <Text>@{user.displayName}</Text>
            <Button onPress={() => this.props.router.push('/logout')}>
              Logout
            </Button>
          </View>
          {this.props.data.user.photos.map(photo => {
            return <Photo key={photo.id} photo={photo} user={this.props.data.user} />;
          })}
        </View>
      </ScrollView>
    );
  }
}

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

export default graphql(FeedQuery)(withRouter(UserProfile));
