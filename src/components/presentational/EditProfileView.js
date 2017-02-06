import React, { Component } from 'react';
import {
  Text
} from 'react-native';

class EditProfileView extends Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      displayName: nextProps.data.user.displayName,
      name: nextProps.data.user.name,
      profileImage: nextProps.data.user.profileImage,
      emailAddress: nextProps.data.user.emailAddress
    });
  }

  setInput = (stateKey, event) => {
    this.setState({[stateKey]: event.target.value});
  }

  handeSubmit() {
    let { displayName, name, profileImage, emailAddress } = this.state;

    this.props.handeSubmit(displayName, name, profileImage, emailAddress);
  }

  render() {
    return <Text>TODO</Text>;
    // if (!user) {
    //   return <Loading />;
    // }

    // return (
    //   <div className="columns" style={{maxWidth: "1040px", margin: "0 auto"}}>
    //     <div className="column">
    //       <InputField
    //         iconClass="fa-user"
    //         stateKey="displayName"
    //         labelName="Username"
    //         placeholder="@somebody"
    //         value={state.displayName}
    //         handleChange={this.setInput}
    //         />

    //       <InputField
    //         iconClass="fa-user"
    //         stateKey="name"
    //         labelName="Name"
    //         placeholder="Jimmy Doe"
    //         value={state.name}
    //         handleChange={this.setInput}
    //         />

    //       <InputField
    //         iconClass="fa-picture-o"
    //         stateKey="profileImage"
    //         labelName="Profile Image"
    //         placeholder="example.com/image.png"
    //         value={state.profileImage}
    //         handleChange={this.setInput}
    //         />

    //       <InputField
    //         iconClass="fa-envelope-o"
    //         stateKey="emailAddress"
    //         labelName="Email"
    //         placeholder="jimmy@example.com"
    //         value={state.emailAddress}
    //         handleChange={this.setInput}
    //         />

    //       <div className="control is-grouped">
    //         <p className="control">
    //           <button className="button is-primary" onClick={this.handleSubmit}>Submit</button>
    //         </p>
    //         <p className="control">
    //           <button className="button is-link">Cancel</button>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
