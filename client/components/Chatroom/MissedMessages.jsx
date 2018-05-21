import React from 'react';
import PropTypes from 'prop-types';

const MissedMessages = ({
  clearMissedMsg,
  handleLogOut,
  missed,
  missedMsg,
  toggleMissed,
}) => (
  <div className="missed-msg-btns">
    <button className="logout" onClick={handleLogOut}>
      <i className="fas fa-power-off" />
    </button>
    {!missed ? (
      <button className="unread-btn" onClick={toggleMissed}>
        New
      </button>
    ) : (
      <button
        className="back-btn"
        onClick={() => {
          toggleMissed();
          clearMissedMsg();
        }}
      >
        <i className="fas fa-undo-alt fa-2x" />
      </button>
    )}
    {!missed && <p className="missed-count">{missedMsg.length}</p>}
  </div>
);

MissedMessages.propTypes = {
  clearMissedMsg: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  missed: PropTypes.bool.isRequired,
  missedMsg: PropTypes.array.isRequired,
  toggleMissed: PropTypes.func.isRequired,
};

export default MissedMessages;
