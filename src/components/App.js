import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import LoginAuth0 from '../components/LoginAuth0';
// import {
//   Button,
//   Header,
//   Container,
//   Title,
//   Content,
//   Spinner,
// } from 'native-base';

class App extends Component {
  render () {
    console.log(this.props);
    // return (
    //   <Container>
    //     <Header>
    //       <Title>Instaclone</Title>
    //     </Header>
    //     <Container style={{marginTop: 100}}>
    //       <LoginAuth0 />
    //     </Container>
    //   </Container>
    // );
    return <LoginAuth0 />;
  }
}

export default withRouter(App);
