import React from 'react';
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

const UserProfileView = (props) => {
  if (props.data.loading) {
    return <Spinner />;
  }

  if (!props.isLoggedIn) {
    return (<Text>You must login to see your profile</Text>);
  }

  if (props.data.error) {
    this.props.router.push('/');
  }
  // debugger;
  let user = props.data.user;

  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Text>@{user.displayName}</Text>
          <Button onPress={() => this.props.router.push('/logout')}>
            Logout
          </Button>
        </View>
        {props.data.user.photos.map(photo => {
          return <Photo key={photo.id} photo={photo} user={props.data.user} />;
        })}
      </View>
    </ScrollView>
  );
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


export default UserProfileView;
