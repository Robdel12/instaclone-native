import React, { Component } from 'react';
import Photo from '../presentational/Photo';
import LoadingPost from '../presentational/LoadingPost';
import {
  ScrollView
} from 'react-native';

const ITEM_HEIGHT = 485;

class ListPageView extends Component {
  setCurrentReadOffset = (event) => {
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / ITEM_HEIGHT);

    this.props.setCurrentReadOffset(currentItemIndex);
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} scrollEventThrottle={300} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
        {this.props.datasetState.map(record => {
          if(record.isPending && !record.isSettled) {
            return <LoadingPost key={Math.random()}/>;
          }

          return <Photo key={record.content.id} photo={record.content} user={record.content.user} />;
        })}
      </ScrollView>
    );
  }
}

export default ListPageView;
