import { createActions } from 'redux-actions';

export const { fetchUser: { request, success, failure } } = createActions({
  FETCH_USER: {
    REQUEST: undefined,
    SUCCESS: undefined,
    FAILURE: undefined
  }
});
