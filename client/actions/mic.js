import { TOGGLE_MIC } from '../../constants';

const handleToggleMic = bool => ({
  type: TOGGLE_MIC,
  payload: bool,
});

module.exports = {
  handleToggleMic,
};
