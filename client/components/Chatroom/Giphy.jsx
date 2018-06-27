import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMessage, sendPrivateMessage } from '../../actions';
import { handleToggleEmoji } from '../../actions/emoji';
import { fetchGiphy, handleToggleGiphy } from '../../actions/giphy';

class Giphy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      giphySelected: null,
      giphySearch: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGiphySelect = this.handleGiphySelect.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleGiphySelect(e) {
    const {
      user: { username, avatar },
      isLocked,
      isMatchPrivatePassword,
    } = this.props;
    const date = new Date();
    const imageMsg = e.target.value || '';

    if (imageMsg) {
      this.setState({ giphySelected: imageMsg });

      if (isMatchPrivatePassword && !isLocked) {
        this.props.sendPrivateMessage({
          username,
          userAvatar: avatar,
          date,
          imageMsg,
          text: '',
        });
      } else {
        this.props.sendMessage({
          username,
          userAvatar: avatar,
          date,
          imageMsg,
          text: '',
        });
      }

      this.props.handleToggleGiphy(false);
    }
  }

  handleChange(e) {
    const giphySearch = e.target.value || '';

    this.setState({ giphySearch });
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.toggleGiphy) {
      this.props.handleToggleGiphy(false);
      this.setState({ giphySearch: '' });
    } else {
      this.props.handleToggleGiphy(true);
      this.props.handleToggleEmoji(false);
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const { giphySearch } = this.state;
    this.props.fetchGiphy(giphySearch);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch(e);
    }
  }

  renderGiphy(giphy) {
    return giphy.map((gif) => {
      const { id, images } = gif;

      return (
        <label key={id} htmlFor={id} className="giphy__list--single">
          <input
            id={id}
            type="radio"
            className="giphy__radioInput"
            value={images.fixed_height_small.url}
            checked={this.state.giphySelected === id}
          />
          <img src={images.fixed_height_small.url} alt={id} />
        </label>
      );
    });
  }

  render() {
    const { giphy, toggleGiphy } = this.props;
    const { giphySearch } = this.state;

    return (
      <div className="giphy">
        <button onClick={this.handleClick} className="giphy__btn">
          <i className="far fa-hand-peace" />
        </button>
        {toggleGiphy && (
          <div className="giphy__picker">
            <div className="giphy__search">
              <input
                type="text"
                onChange={this.handleChange}
                className="giphy_search--input"
                placeholder=" cute puppies..."
                onKeyPress={this.handleKeyPress}
              />
              <button
                onClick={this.handleSearch}
                className="giphy__search--btn"
                disabled={giphySearch.length < 1}
              >
                Search
              </button>
            </div>

            <div className="giphy__list" onChange={this.handleGiphySelect}>
              {this.renderGiphy(giphy)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  giphy: state.giphy,
  toggleGiphy: state.toggleGiphy,
  user: state.user,
  isMatchPrivatePassword: state.isMatchPrivatePassword,
  isLocked: state.isLocked,
});

Giphy.propTypes = {
  fetchGiphy: PropTypes.func.isRequired,
  giphy: PropTypes.array.isRequired,
  handleToggleEmoji: PropTypes.func.isRequired,
  handleToggleGiphy: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  sendPrivateMessage: PropTypes.func.isRequired,
  toggleGiphy: PropTypes.bool.isRequired,
  isMatchPrivatePassword: PropTypes.bool.isRequired,
  isLocked: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  fetchGiphy,
  handleToggleEmoji,
  handleToggleGiphy,
  sendMessage,
  sendPrivateMessage,
})(Giphy);
