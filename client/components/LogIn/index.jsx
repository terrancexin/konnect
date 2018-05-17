import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeErrorMessage, enterOpenChat } from '../../actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handle = this.handle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username } = this.state;

    this.props.enterOpenChat(String(username));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handle(e) {
    this.props.removeErrorMessage();
    this.setState({ username: e.target.value });
  }

  render() {
    const { username } = this.state;
    const { err } = this.props;

    return (
      <div className="welcome-login-wrapper">
        <form onSubmit={this.handleSubmit} className="welcome-login-form" autoComplete="off">
          <label className="welcome-login-input-label">Let's Konnect!</label>
          <div className="welcome-login-error">{err ? err : ''}</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.handle}
            maxLength="15"
            placeholder={'are you kaskade?'}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  err: state.err,
});

export default connect(mapStateToProps, {
  removeErrorMessage,
  enterOpenChat
})(LogIn);
