/* global ROOT_URL, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(avatar) {
    return (e) => {
      e.preventDefault();
      if (document.querySelector('.avatar.selected')) {
        document.querySelector('.avatar.selected').className = 'avatar not-selected';
      }

      e.target.className = 'avatar selected';
      this.props.handleAvatar(avatar);
    };
  }

  render() {
    const avatars = [];
    for (let i = 1; i < 12; i++) {
      avatars.push(`${ROOT_URL}/images/avatars/${i}.png`);
    }

    return (
      <div className="avatar-list">
        {avatars.map((avatar, idx) => (
          <img
            key={idx}
            onClick={this.handleClick(avatar)}
            src={avatar}
            className="avatar not-selected"
            alt="avatar"
          />
        ))}
      </div>
    );
  }
}

Avatar.propTypes = {
  handleAvatar: PropTypes.func.isRequired,
};

export default Avatar;

