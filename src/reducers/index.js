import {combineReducers} from 'redux';
import user from './users.js';
import followers from './followers';
import auth from './auth';

export default combineReducers({
  auth,
  followers,
  user
});
