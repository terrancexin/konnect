import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';

import { handleToggleEmoji, handleToggleGiphy } from '../../actions';

class Emoji extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.toggleEmoji) {
      this.props.handleToggleEmoji(false);
    } else {
      this.props.handleToggleEmoji(true);
      this.props.handleToggleGiphy(false);
    }
  }

  render() {
    const { addEmoji, toggleEmoji } = this.props;

    return (
      <div className="emoji">
        <button onClick={this.handleClick} className="emoji-btn">
          <i className="far fa-smile" />
        </button>
        {toggleEmoji && (
          <Picker
            emojiSize={20}
            onSelect={addEmoji}
            sheetSize={20}
            showPreview={false}
            showSkinTones={false}
            perLine={5}
            include={['recent', 'people', 'foods', 'nature', 'symbols']}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              height: '300px',
              overflow: 'scroll',
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toggleEmoji: state.toggleEmoji,
});

Emoji.propTypes = {
  addEmoji: PropTypes.func.isRequired,
  toggleEmoji: PropTypes.bool.isRequired,
  handleToggleEmoji: PropTypes.func.isRequired,
  handleToggleGiphy: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  handleToggleEmoji,
  handleToggleGiphy,
})(Emoji);

