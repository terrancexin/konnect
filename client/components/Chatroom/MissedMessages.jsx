import React from 'react';

const MissedMessages = ({ handleLogOut, missedMsg, toggleMissed, missed}) => {
  return (
    <div className="missed-msg-btns">
      <button className="logout" onClick={handleLogOut}>
        <i className="fas fa-power-off"></i>
      </button>
      {!missed ? <button className="unread-btn" onClick={toggleMissed}>
                  missed
                </button>
              : <button className="back-btn" onClick={toggleMissed}>
                  <i className="fas fa-undo-alt fa-2x"></i>
                </button>}
      {!missed && <p className="missed-count">{missedMsg.length}</p>}
    </div>
  )
}

export default MissedMessages;