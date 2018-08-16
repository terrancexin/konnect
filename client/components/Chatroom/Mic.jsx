import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Mic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMicActive: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isMicActive: !this.state.isMicActive });
  }

  render() {
    const { isMicActive } = this.state;

    if (isMicActive) {
      const Voice = require('../Voice');

      return <Voice.default />
    } else {
      return (
        <div className="mic">
          <button onClick={this.handleClick} className="mic__btn">
            <i className="fas fa-microphone-alt" />
          </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  mic: state.mic,
});

Mic.propTypes = {
  mic: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Mic);
