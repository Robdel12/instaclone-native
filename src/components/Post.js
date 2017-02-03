import React from 'react'
import { View, Image, Text } from 'react-native'


export default class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  render () {
    return (
      <View style={{flex: 1, width: 350, height: 350}}>
        <Image
          source={{ uri: this.props.post.imageUrl }}
          style={{flex: 1, width: 350, height: 350}}
        />
        <Text>{this.props.post.description}</Text>
      </View>
    )
  }
}
