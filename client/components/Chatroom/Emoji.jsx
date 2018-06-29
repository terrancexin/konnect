import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';

import { handleToggleEmoji } from '../../actions/emoji';
import { handleToggleGiphy } from '../../actions/giphy';

export class Emoji extends Component {
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
            include={['recent', 'people', 'foods', 'nature', 'symbols']}
            onSelect={addEmoji}
            perLine={5}
            sheetSize={20}
            showPreview={false}
            showSkinTones={false}
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
  handleToggleEmoji: PropTypes.func.isRequired,
  handleToggleGiphy: PropTypes.func.isRequired,
  toggleEmoji: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  handleToggleEmoji,
  handleToggleGiphy,
})(Emoji);

