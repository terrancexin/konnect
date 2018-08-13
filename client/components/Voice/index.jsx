import React from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

const Dictaphone = ({ transcript, resetTranscript, browserSupportsSpeechRecognition }) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <button onClick={resetTranscript}>Reset</button>
      <span>{transcript}</span>
    </div>
  );
};

Dictaphone.propTypes = {
  transcript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
};

export default SpeechRecognition(Dictaphone);

