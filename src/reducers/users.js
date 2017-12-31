import { handleAction, handleActions } from 'redux-actions';
import {
  request,
  success,
  failure
} from '../actions/users';
import { combineReducers } from 'redux';

/* const query = handleAction(
  request,
  (state, action) => action.payload,
  ``
); */
const users = handleAction(
  success,
  (state, action) => action.payload,
  []
);
const error = handleAction(
  failure,
  (state, action) => action.error,
  null
);

const isFetched = handleActions(
  {
    [request]: () => false,
    [success]: () => true,
    [failure]: () => false
  },
  false
);

const isFetching = handleActions(
  {
    [request]: () => true,
    [success]: () => false,
    [failure]: () => false
  },
  false
);

export default combineReducers({
  users,
  error,
  isFetched,
  isFetching
});
