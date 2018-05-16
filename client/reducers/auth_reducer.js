import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../../constants';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, err: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, err: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
