import { TOGGLE_EMOJI } from '../../../constants';
import { handleToggleEmoji } from '../emoji';

describe('Emoji actions', () => {
  it('handleToggleEmoji has the correct type', () => {
    const action = handleToggleEmoji();

    expect(action.type).toEqual(TOGGLE_EMOJI);
  });

  it('handleToggleEmoji has the correct payload', () => {
    const action = handleToggleEmoji(true);

    expect(action.payload).toEqual(true);
  });
});
