/* global ROOT_URL */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = { avatarRadio: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;

    if (value) {
      this.setState({ avatarRadio: parseInt(value, 10) });
      this.props.handleAvatar(value);
    }
  }

  render() {
    const avatars = [];

    for (let i = 1; i < 12; i++) {
      avatars.push(
        <label key={i} htmlFor={`avatar${i}`} className="radio-label">
          <input
            id={`avatar${i}`}
            type="radio"
            className="avatar-input"
            value={i}
            checked={this.state.avatarRadio === i}
          />
          <img src={`${ROOT_URL}/images/avatars/${i}.png`} alt="avatar" />
        </label>);
    }

    return (
      <div className="avatar-list" onChange={this.handleChange}>
        {avatars}
      </div>
    );
  }
}

Avatar.propTypes = {
  handleAvatar: PropTypes.func.isRequired,
};

export default Avatar;
