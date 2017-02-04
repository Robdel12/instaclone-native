import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-native';
import Navigation from '../components/Navigation';
import {
  Header,
  Container,
  Title,
  Content,
  Footer
} from 'native-base';

class App extends Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <Container>
        <Header>
          <Title>Instaclone</Title>
        </Header>
        <Content style={{marginTop: 5}}>
          {this.props.children}
        </Content>
        <Footer>
          <Navigation isLoggedIn={this.props.isLoggedIn} handleToken={this.props.handleToken} />
        </Footer>
      </Container>
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
