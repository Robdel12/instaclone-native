import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Link } from 'react-router-native';
import LoginAuth0 from '../components/LoginAuth0';
import {
  Button,
  Header,
  Container,
  Title,
  Content,
  Spinner,
  Footer,
  FooterTab,
  Icon,
  Badge
} from 'native-base';

class App extends Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  handlePress(path) {
    this.props.router.push(path);
  }

  render () {
    let user = this.props.data.user;

    return (
      <Container>
        <Header>
          <Title>Instaclone</Title>
          {!user &&
            <Button transparent>
                <LoginAuth0>
                    Login
                    <Icon name='ios-log-in' />
                  </LoginAuth0>
              </Button>
            }
            {user &&
              <Button transparent onPress={this.handlePress.bind(this, '/logout')}>
                  Logout
                  <Icon name='ios-log-out' />
                </Button>
              }
        </Header>
        <Content style={{marginTop: 100}}>
          {this.props.children}
        </Content>
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
