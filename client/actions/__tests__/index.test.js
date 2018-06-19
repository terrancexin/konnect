import {
  handleToggleEmoji,
  setImgSrc,
  setFileName,
  toggleLock,
} from '../index';

import {
  TOGGLE_EMOJI,
  SET_IMAGE_SRC,
  SET_FILE_NAME,
  TOGGLE_LOCK,
} from '../../../constants';

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

describe('Image upload actions', () => {
  it('setImgSrc has the correct type', () => {
    const action = setImgSrc();

    expect(action.type).toEqual(SET_IMAGE_SRC);
  });

  it('setImgSrc has the correct payload', () => {
    const action = setImgSrc('base64');

    expect(action.payload).toEqual('base64');
  });

  it('setFileName has the correct type', () => {
    const action = setFileName();

    expect(action.type).toEqual(SET_FILE_NAME);
  });

  it('setFileName has the correct payload', () => {
    const action = setFileName('name');

    expect(action.payload).toEqual('name');
  });
});

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
