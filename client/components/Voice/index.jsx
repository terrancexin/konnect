import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

class Voice extends Component {
  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    this.props.resetTranscript();
  }

  handleSend(e) {
    e.preventDefault();
  }

  render() {
    const { transcript, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="voice">
        <div className="voice__title">Voice to Text</div>
        <div className="voice__transcriptText">{transcript}</div>
        <div className="voice__btns">
          <button className="voice__btn--reset" onClick={this.handleReset}>
            Reset
          </button>
          <button className="voice__btn--send" onClick={this.handleSend}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

Voice.propTypes = {
  browserSupportsSpeechRecognition: PropTypes.bool.isRequired,
  resetTranscript: PropTypes.func.isRequired,
  transcript: PropTypes.string.isRequired,
};

export default SpeechRecognition(Voice);