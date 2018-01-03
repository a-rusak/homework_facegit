import { createActions } from 'redux-actions';

export const { fetchFollowers: { request, success, failure } } = createActions({
  FETCH_FOLLOWERS: {
    REQUEST: undefined,
    SUCCESS: undefined,
    FAILURE: undefined
  }
});
