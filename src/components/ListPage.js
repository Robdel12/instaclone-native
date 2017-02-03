import React from 'react';
import Post from './Post';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ScrollView, View, Text, Button } from 'react-native';
import { withRouter } from 'react-router-native';
import {
  Spinner
} from 'native-base';

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    router: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<Spinner />);
    }

    return (
      <View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              }}>
              {this.props.data.allPhotos.map((post) =>
                <Post key={post.id} post={post} />
              )}
          </View>
        </ScrollView>
        <Button
          onPress={this.createPost}
          title="Create Post"
        />
      </View>
    )
  }

  createPost = () => {
    this.props.router.push('/create');
  }
}

const FeedQuery = gql`query { allPhotos(orderBy: createdAt_DESC) { id imageUrl description } }`;

const ListPageWithData = graphql(FeedQuery)(ListPage);

export default withRouter(ListPageWithData);
