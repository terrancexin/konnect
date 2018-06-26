import axios from 'axios';
import { GIPHY, RECEIVE_GIPHY, TOGGLE_GIPHY } from '../../constants';

export const fetchGiphy = search => (dispatch) => {
  let url = `${GIPHY.searchUrl}?api_key=${GIPHY.api_key}&q=yay&limit=${GIPHY.limit}&rating=${GIPHY.rating}`;

  if (search) {
    url = `${
      GIPHY.searchUrl
    }?api_key=${
      GIPHY.api_key
    }&q=${
      search
    }&limit=${
      GIPHY.limit
    }&rating=${
      GIPHY.rating
    }`;
  }

  axios
    .get(url)
    .then(({ data: { data } }) => {
      dispatch({
        type: RECEIVE_GIPHY,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(`fetching giphy failed: ${err}`);
    });
};

export const handleToggleGiphy = bool => ({
  type: TOGGLE_GIPHY,
  payload: bool,
});
