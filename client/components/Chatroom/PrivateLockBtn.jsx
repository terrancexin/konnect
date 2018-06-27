import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  handleTogglePrivatePWInput,
  submitPrivatePassword,
  toggleLock,
  unlockPrivateMessage,
} from '../../actions/private';
import { removeLoginError } from '../../actions/user';

class PrivateLockBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { privatePassword: '' };

    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.toggleLock(true);
  }

  componentWillUnmount() {
    this.props.removeLoginError();
    this.props.unlockPrivateMessage(false);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.removeLoginError();

    if (this.props.isLocked) {
      this.setState({ privatePassword: '' });
      this.props.handleTogglePrivatePWInput(true);
    } else {
      this.props.submitPrivatePassword('false');
    }

    this.props.toggleLock(!this.props.isLocked);
  }

  handleExit(e) {
    e.preventDefault();
    this.setState({ privatePassword: '' });
    this.props.handleTogglePrivatePWInput(false);
    this.props.toggleLock(true);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.setState({ privatePassword: '' });
      this.props.handleTogglePrivatePWInput(false);
      this.props.toggleLock(true);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.submitPrivatePassword(this.state.privatePassword);
    }
  }

  handleChange(e) {
    this.props.removeLoginError();
    const { value } = e.target;

    this.setState({ privatePassword: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitPrivatePassword(this.state.privatePassword);
  }

  render() {
    const { isLocked, err, privatePasswordInput, isMatchPrivatePassword } = this.props;

    return (
      <div className="privateLock">
        <div className="privateLock__footer">
          {isMatchPrivatePassword && (
            <span className="privateLock__footer--on">
              <i className="fas fa-user-secret" /> Private Mode
            </span>
          )}
          <button onClick={this.handleClick} className="privateLock__btn">
            {isLocked && <i className="fas fa-lock" />}
            {!isLocked && <i className="fas fa-unlock" />}
          </button>
          {isMatchPrivatePassword && (
            <span className="privateLock__footer--on">
              Private Mode <i className="fas fa-user-secret" />
            </span>
          )}
        </div>
        {privatePasswordInput && (
          <div className="privateLock__passwordInput">
            <span className="login-error--private">{err || ''}</span>
            <div className="privateLock__passwordInput--field">
              <button onClick={this.handleExit} className="private__btn--exit">
                <i className="fas fa-times-circle" />
              </button>
              <input
                type="password"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                value={this.state.privatePassword}
                maxLength="12"
                onKeyPress={this.handleKeyPress}
              />
              <button onClick={this.handleSubmit} className="private__btn--enter">
                <i className="fas fa-arrow-alt-circle-right fa-3x" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLocked: state.isLocked,
  err: state.err,
  privatePasswordInput: state.privatePasswordInput,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
});

PrivateLockBtn.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  toggleLock: PropTypes.func.isRequired,
  submitPrivatePassword: PropTypes.func.isRequired,
  removeLoginError: PropTypes.func.isRequired,
  err: PropTypes.string.isRequired,
  handleTogglePrivatePWInput: PropTypes.func.isRequired,
  privatePasswordInput: PropTypes.bool.isRequired,
  unlockPrivateMessage: PropTypes.func.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  toggleLock,
  submitPrivatePassword,
  removeLoginError,
  handleTogglePrivatePWInput,
  unlockPrivateMessage,
})(PrivateLockBtn);
