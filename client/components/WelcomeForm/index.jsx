import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions';

class WelcomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    const { username, password } = this.state;
    this.props.signUpUser({ username, password });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSignUp();
    }
  }

  render() {
    return (
      <div>
        <input
          name="username"
          type="text"
          id="user"
          placeholder="username"
          onChange={this.handleInputChange}
        />
        <input
          name="password"
          type="password"
          id="password"
          placeholder="password"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
      <button onClick={this.handleSignUp}>Let's Konnect!</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, { signUpUser })(WelcomeForm);
