import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

class Voice extends Component {
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="voice">
        <button onClick={resetTranscript}>Reset</button>
        <span className="voice__transcriptText">{transcript}</span>
      </div>
    );
  }
}

Voice.propTypes = {
  transcript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
};

export default SpeechRecognition(Voice);
