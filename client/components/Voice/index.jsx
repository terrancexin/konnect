import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

class Voice extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    return (e) => {
      e.preventDefault();
      this.props.resetTranscript();
    }
  }

  render() {
    const {
      transcript,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="voice">
        <button onClick={this.handleClick()}>Reset</button>
        <div className="voice__transcriptText">{transcript}test</div>
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
