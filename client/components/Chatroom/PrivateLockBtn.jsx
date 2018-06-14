import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleLock, submitPrivatePassword } from '../../actions';

class PrivateLockBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { privatePassword: '' };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.toggleLock();
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.toggleLock();
    }
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({ privatePassword: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitPrivatePassword(this.state.privatePassword);
  }

  render() {
    const { isLocked } = this.props;

    return (
      <div className="privateLock">
        <button onClick={this.handleClick} className="privateLock__btn">
          {isLocked && <i className="fas fa-lock" />}
          {!isLocked && <i className="fas fa-unlock" />}
        </button>
        {!isLocked && (
          <div className="privateLock__passwordInput">
            <input
              type="text"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              value={this.state.privatePassword}
              maxLength="15"
            />
            <button onClick={this.handleClick} className="private__Enter">
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
