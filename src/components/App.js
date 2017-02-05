import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-native';
import Navigation from '../components/Navigation';
import {
  View,
  Text
} from 'react-native';
import {
  Footer
} from 'native-base';

class App extends Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.error) {
      // try to catch a token expire
      debugger;
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{borderStyle: 'solid', borderBottomWidth: 1, borderColor: "#ddd", marginBottom: 10}}>
          <Text style={{fontSize: 20, paddingTop: 25, paddingBottom: 10, alignSelf: 'center', textAlign: 'center'}}>Instaclone</Text>
        </View>
        {this.props.children}
        <Navigation isLoggedIn={this.props.isLoggedIn} handleToken={this.props.handleToken} />
      </View>
    );
  }
}

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(App));
