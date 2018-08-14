import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Mic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMicActive: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
  }

  render() {
    const { isMicActive } = this.state;

    return (
      <div className="giphy">
        <button onClick={this.handleClick} className="giphy__btn">
          <i className="fas fa-microphone-alt" />
        </button>
        {isMicActive && (
          <div>test</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  giphy: state.giphy,
});

export default connect(
  mapStateToProps,
  null,
)(Mic);
