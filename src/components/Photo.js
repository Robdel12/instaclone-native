import React from 'react';
import { View, Image, Text } from 'react-native';


export default class Photo extends React.Component {

  static propTypes = {
    Photo: React.PropTypes.object,
  }

  render () {
    let photo = this.props.photo;

    return (
      <View style={{flex: 1, width: 350, height: 350}}>
        <Image
          source={{ uri: photo.imageUrl }}
          style={{flex: 1, width: 350, height: 350}}
        />
        <Text>{photo.description}</Text>
      </View>
    )
  }
}
