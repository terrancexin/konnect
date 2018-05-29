import React from 'react';
import PropTypes from 'prop-types';

const NavBtns = ({
  clearMissedMsg,
  handleLogOut,
  missed,
  missedMsg,
  toggleMissed,
  username,
}) => (
  <div className="nav-btns">
    <button className="nav-btns-logout" onClick={handleLogOut}>
      <i className="fas fa-power-off" />
    </button>
    {!missed ? (
      <button className="nav-btns-unread" onClick={toggleMissed}>
        New
      </button>
    ) : (
      <button
        className="nav-btns-back"
        onClick={() => {
          clearMissedMsg(username);
          toggleMissed();
        }}
      >
        <i className="fas fa-undo-alt fa-2x" />
      </button>
    )}
    {!missed && <span className="nav-btns-missed" onClick={toggleMissed}>{missedMsg.length}</span>}
  </div>
);

NavBtns.propTypes = {
  clearMissedMsg: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  missed: PropTypes.bool.isRequired,
  missedMsg: PropTypes.array.isRequired,
  toggleMissed: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default NavBtns;
