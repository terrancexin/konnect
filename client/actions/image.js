import { SET_FILE_NAME, SET_IMAGE_SRC } from '../../constants';

export const setImgSrc = imgSrc => ({
  type: SET_IMAGE_SRC,
  payload: imgSrc,
});

export const setFileName = file => ({
  type: SET_FILE_NAME,
  payload: file,
});
