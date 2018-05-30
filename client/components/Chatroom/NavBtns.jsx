import React from 'react';
import PropTypes from 'prop-types';

const NavBtns = ({
  clearMissedMsg,
  handleLogOut,
  handleToggleMissedMsg,
  missedMsg,
  toggleMissedMsg,
  username,
}) => (
  <div className="nav-btns">
    <button className="nav-btns-logout" onClick={handleLogOut}>
      <i className="fas fa-power-off" />
    </button>
    {!toggleMissedMsg ? (
      <button className="nav-btns-unread" onClick={handleToggleMissedMsg}>
        New
        <span className="nav-btns-missed">{missedMsg.length}</span>
      </button>
    ) : (
      <button
        className="nav-btns-back"
        onClick={() => {
          clearMissedMsg(username);
          handleToggleMissedMsg();
        }}
      >
        <i className="fas fa-undo-alt fa-2x" />
      </button>
    )}
  </div>
);

NavBtns.propTypes = {
  clearMissedMsg: PropTypes.func.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  handleToggleMissedMsg: PropTypes.func.isRequired,
  missedMsg: PropTypes.array.isRequired,
  toggleMissedMsg: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default NavBtns;
