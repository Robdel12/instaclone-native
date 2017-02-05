import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

import {
  Card,
  CardItem,
} from 'native-base';

export default class Photo extends Component {
  static propTypes = {
    photo: React.PropTypes.object,
  }

  get formattedDate() {
    return moment(this.props.photo.createdAt).format("MMM Do, YYYY");
  }

  render() {
    let user = this.props.user;
    let photo = this.props.photo;

    return (
      <Card style={[styles.cardContainer, this.props.style]}>
        <CardItem>
          <View style={[styles.container, { justifyContent: 'space-between'}]}>
            <View style={styles.container}>
              <Image style={styles.profileImage} source={{uri: user.profileImage}} />
              <Text style={{paddingLeft: 5}}>@{user.displayName}</Text>
            </View>
            <View style={styles.container}>
              <Text>{this.formattedDate}</Text>
            </View>
          </View>
        </CardItem>
        <CardItem>
          <Image style={{resizeMode: 'cover', width: 380, height: 380}} source={{uri: photo.imageUrl}} />
        </CardItem>
        <CardItem>
          <Text>{photo.description}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    flex: 1
  },
  profileImage: {
    height: 35,
    width: 35,
    borderRadius: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
