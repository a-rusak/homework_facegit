import { handleAction } from 'redux-actions';
import { authorize } from '../actions/auth';

export default handleAction(
  authorize,
  (state, action) => {
    console.log(action);
    return action.payload
  },
  {
    name: `dex157`,
    token: ``
  }
);

export const getIsAuthorized = state => {
  return state.auth.token !== ``;
};
export const getToken = state => state.auth.token;
export const getName = state => {
  return state.auth.name
};
