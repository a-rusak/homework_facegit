import { handleAction, handleActions } from 'redux-actions';
// import { normalize, schema } from 'normalizr';
import {
  request,
  success,
  failure
} from '../actions/followers';
import { combineReducers } from 'redux';

const data = handleAction(
  success,
  (state, action) => {
    /* const user = new schema.Entity('ids');
    const mySchema = { data: [user] };
    const normalizedData = normalize(
      action.payload,
      mySchema
    );
    return normalizedData.entities.ids; */
    return action.payload.data;
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

export const getIsFetching = state => state.followers.isFetching;
export const getIsFetched = state => state.followers.isFetched;
export const getError = state => state.followers.error;
export const getData = state => state.followers.data;
