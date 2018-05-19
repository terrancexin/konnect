import React, { Component } from 'react';

class PrivateChat extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: ''
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
  }
  
  handleUsername(e) {
    this.setState({ username: e.target.value });
  }
  
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="private-chat-form">
          <input type="text" autoComplete="off" onChange={this.handleUsername} placeholder="username"/>
          <input onChange={this.handlePassword} placeholder="password" />
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}

export default PrivateChat;