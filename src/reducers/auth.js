import { handleAction } from 'redux-actions';
import { authorize } from '../actions/auth';

export default handleAction(
  authorize,
  (state, action) => action.payload,
  {
    name: ``,
    token: ``
  }
);

export const getIsAuthorized = state => {
  return state.auth.token !== ``;
};
export const getToken = state => state.auth.token;
export const getName = state => {
  console.log(state)
  return state.auth.name
};
