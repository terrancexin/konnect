import React from 'react';
import PropTypes from 'prop-types';

const Typing = ({ typing, typingUsers, verbs }) => {
  if (typing && typingUsers.length > 3) {
    const remaining = typingUsers.length - 3;

    return (
      <div className="is-typing">
        {`${typingUsers.slice(0, 3).join(', ')} and ${remaining} others are typing...`}
      </div>
    );
  }

  return (
    <div className="is-typing">
      {typing ? `${typingUsers.join(', ')} ${verbs} typing...` : ''}
    </div>
  );
};

Typing.propTypes = {
  typing: PropTypes.bool.isRequired,
  typingUsers: PropTypes.array.isRequired,
  verbs: PropTypes.string.isRequired,
};

export default Typing;
