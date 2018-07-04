import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { rootUrl } from '../../../constants';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = { avatarSelected: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;

    if (value) {
      this.setState({ avatarSelected: parseInt(value, 10) });
      this.props.handleAvatar(value);
    }
  }

  render() {
    const avatars = [];
    let avatar;

    for (let i = 1; i < 12; i++) {
      avatar = (
        <label key={i} htmlFor={`avatar${i}`} className="login__avatar--radio">
          <input
            checked={this.state.avatarSelected === i}
            id={`avatar${i}`}
            type="radio"
            value={i}
          />
          <img src={`${rootUrl()}/images/avatars/${i}.png`} alt="avatar" />
        </label>
      );

      avatars.push(avatar);
    }

    return (
      <div className="login__avatar--list" onChange={this.handleChange}>
        {avatars}
      </div>
    );
  }
}

Avatar.propTypes = {
  handleAvatar: PropTypes.func.isRequired,
};

export default Avatar;
