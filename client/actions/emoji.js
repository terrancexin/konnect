import { TOGGLE_EMOJI } from '../../constants';

const handleToggleEmoji = bool => ({
  type: TOGGLE_EMOJI,
  payload: bool,
});

module.exports = {
  handleToggleEmoji,
};
