import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Voice from '../Voice';
import { handleToggleMic } from '../../actions/mic';
import { sendMessage } from '../../actions/message';

class Mic extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCloseTranscript = this.handleCloseTranscript.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { toggleMic } = this.props;

    this.props.handleToggleMic(!toggleMic);
  }

  handleCloseTranscript() {
    this.props.handleToggleMic(false);
  }

  render() {
    const { toggleMic, user } = this.props;

    return (
      <div className="mic">
        <button onClick={this.handleClick} className="mic__btn">
          <i className="fas fa-microphone-alt" />
        </button>
        {toggleMic && (
          <div className="mic__voice--modal">
            <button onClick={this.handleCloseTranscript} className="mic__x">
              <i className="fas fa-times" />
            </button>
            <Voice
              user={user}
              sendMessage={this.props.sendMessage}
              handleToggleMic={this.props.handleToggleMic}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toggleMic: state.toggleMic,
  user: state.user,
});

Mic.propTypes = {
  toggleMic: PropTypes.bool.isRequired,
  handleToggleMic: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { handleToggleMic, sendMessage },
)(Mic);
