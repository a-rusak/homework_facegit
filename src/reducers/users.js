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
const data = handleAction(
  success,
  (state, action) => {
    console.log(action.payload);
    return action.payload.data
  },
  null
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
  data,
  error,
  isFetched,
  isFetching
});

export const getIsFetching = state => state.user.isFetching;
export const getIsFetched = state => state.user.isFetched;
export const getError = state => state.user.error;
export const getData = state => state.user.data;
