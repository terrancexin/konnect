import { TOGGLE_LOCK } from '../../../constants';
import { toggleLock } from '../private';

describe('Private message actions', () => {
  it('toggleLock has the correct type', () => {
    const action = toggleLock();

    expect(action.type).toEqual(TOGGLE_LOCK);
  });

  it('toggleLock has the correct payload', () => {
    const action = toggleLock(true);

    expect(action.payload).toEqual(true);
  });
});
