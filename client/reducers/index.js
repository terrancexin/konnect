import { combineReducers } from 'redux';
import auth from './auth_reducer';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
