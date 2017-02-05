import React from 'react';
import Photo from './Photo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dataset from 'impagination';

import { ScrollView, Text } from 'react-native';
import { withRouter } from 'react-router-native';
import {
  Spinner,
  Content
} from 'native-base';

const ITEM_HEIGHT = 485;
const HEADER_HEIGHT = 80;
const PAGE_SIZE = 10;

// Fake loading post for when the data is still loading
const LoadingPost = (props) => {
  let photo = {
    imageUrl: 'loading.com',
    description: 'Loading...',
    createdAt: new Date(),
  };

  let user = {
    profileImage: 'loading.com',
    name: 'Loading...',
    displayName: 'Loading...',
  };

  return <Photo photo={photo} user={user} />;
};

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    router: React.PropTypes.object,
  }

  state = {
    dataset: null,
    datasetState: null,
  }

  setupImpagination() {
    let _this = this;

    let dataset = new Dataset({
      pageSize: PAGE_SIZE,
      loadHorizon: PAGE_SIZE * 2,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe(datasetState) {
        _this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        let skip = pageOffset * pageSize;
        console.log('hey');

        return _this.props.data.fetchMore({
          variables: {
            skip: skip,
            first: pageSize
          },
          updateQuery: () => {
            // This is a required method when using `fetchMore`.
            // You're supposed to use this to add the results to the data on
            // your component. But Impagination does that for us already.
            // So we just return here.
            return;
          }
        }).then(response => response.data.allPhotos);
      }
    });

    dataset.setReadOffset(0);
    this.setState({dataset});
  }

  componentWillMount() {
    this.setupImpagination();
  }

  /**
   * Based on scroll position determine which card is in the current
   * viewport. From there you can set the impagination readOffset
   * equal to the current visibile card.
   *
   * @method setCurrentReadOffset
   */
  setCurrentReadOffset = (event) => {
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / ITEM_HEIGHT);

    this.state.dataset.setReadOffset(currentItemIndex);
  }

  render () {
    if (this.props.data.loading) {
      return (<LoadingPost />);
    }

    return (
      <ScrollView style={{flex: 1}} scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
        {this.state.datasetState.map(record => {
          if(record.isPending && !record.isSettled) {
            return <LoadingPost key={Math.random()}/>;
          }

          return <Photo key={record.content.id} photo={record.content} user={record.content.user} />;
        })}
      </ScrollView>
    )
  }
}

const FeedQuery = gql`query($skip: Int!, $first: Int!) {
  allPhotos(orderBy: createdAt_DESC, first: $first, skip: $skip) {
    id,
    imageUrl,
    description,
    createdAt,
    user {
      id,
      name,
      profileImage,
      displayName
    }
  }
}`;

export default graphql(FeedQuery, {options: {variables: { skip: 0, first: PAGE_SIZE }}})(ListPage);
