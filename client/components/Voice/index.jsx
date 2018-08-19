import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';

import { rootUrl } from '../../../constants';

class Voice extends Component {
  constructor(props) {
    super(props);

    this.handleClear = this.handleClear.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  componentWillMount() {
    this.props.startListening();
  }

  componentWillUnmount() {
    this.props.resetTranscript();
    this.props.stopListening();
  }

  handleClear(e) {
    e.preventDefault();
    this.props.resetTranscript();
  }

  handleSend(e) {
    e.preventDefault();
    const text = document.getElementById('transcript').innerHTML;
    const date = new Date();
    const {
      user: { username, avatar },
      sendMessage,
      handleToggleMic,
    } = this.props;

    sendMessage({
      userAvatar: avatar,
      username,
      text,
      date,
      imageMsg: '',
    });
    handleToggleMic(false);
  }

  render() {
    const { transcript, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="voice">
        <div className="voice__title">
          Listening...<img src={`${rootUrl()}/images/listening.gif`} alt="" />
        </div>
        <div id="transcript" className="voice__transcriptText">
          {transcript}
        </div>
        <div className="voice__btns">
          <button className="voice__btn--clear" onClick={this.handleClear}>
            Clear
          </button>
          <button
            className="voice__btn--send"
            onClick={this.handleSend}
            disabled={transcript.length <= 0}
          >
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
  startListening: PropTypes.func.isRequired,
  stopListening: PropTypes.func.isRequired,
  transcript: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleToggleMic: PropTypes.func.isRequired,
};

export default SpeechRecognition({
  autoStart: false,
})(Voice);
