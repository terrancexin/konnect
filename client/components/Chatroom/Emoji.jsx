import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';

const EmojiBtn = ({ addEmoji, toggleEmojiPicker, handleEmojiPicker }) => (
  <div className="emoji">
    <button onClick={handleEmojiPicker} className="emoji-btn">
      <i className="far fa-smile" />
    </button>
    {toggleEmojiPicker && (
      <Picker
        emojiSize={20}
        onSelect={addEmoji}
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

EmojiBtn.propTypes = {
  addEmoji: PropTypes.func.isRequired,
  toggleEmojiPicker: PropTypes.bool.isRequired,
  handleEmojiPicker: PropTypes.func.isRequired,
};

export default EmojiBtn;

