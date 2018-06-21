import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleLock, submitPrivatePassword } from '../../actions';

class PrivateLockBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { privatePassword: '', openInput: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.isLocked) {
      this.setState({ openInput: true, privatePassword: '' });
    } else {
      this.props.submitPrivatePassword('false');
    }

    this.props.toggleLock(!this.props.isLocked);
  }

  handleExit(e) {
    e.preventDefault();
    this.setState({ openInput: false, privatePassword: '' });
    this.props.toggleLock(true);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.setState({ openInput: false, privatePassword: '' });
      this.props.toggleLock(true);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.submitPrivatePassword(this.state.privatePassword);
      this.setState({ openInput: false, privatePassword: '' });
    }
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({ privatePassword: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitPrivatePassword(this.state.privatePassword);
    this.setState({ openInput: false });
  }

  render() {
    const { isLocked } = this.props;
    const { openInput } = this.state;

    return (
      <div className="privateLock">
        <button onClick={this.handleClick} className="privateLock__btn">
          {isLocked && <i className="fas fa-lock" />}
          {!isLocked && <i className="fas fa-unlock" />}
        </button>
        {openInput && (
          <div className="privateLock__passwordInput">
            <button onClick={this.handleExit} className="private__btn--exit">
              <i className="fas fa-times-circle" />
            </button>
            <input
              type="text"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              value={this.state.privatePassword}
              maxLength="15"
              onKeyPress={this.handleKeyPress}
            />
            <button onClick={this.handleSubmit} className="private__btn--enter">
              <i className="fas fa-arrow-alt-circle-right fa-3x" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLocked: state.isLocked,
});

PrivateLockBtn.propTypes = {
  isLocked: PropTypes.bool.isRequired,
  toggleLock: PropTypes.func.isRequired,
  submitPrivatePassword: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  toggleLock,
  submitPrivatePassword,
})(PrivateLockBtn);
