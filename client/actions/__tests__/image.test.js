import { SET_IMAGE_SRC, SET_FILE_NAME } from '../../../constants';
import { setImgSrc, setFileName } from '../image';

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
