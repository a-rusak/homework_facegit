import {
  request,
  success,
  failure
} from '../actions/users';
import {
  select,
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import { setTokenApi, getUserInformation } from '../api';
import { getName } from '../reducers/auth';
/* import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage'; */

function* fetchUsers(action) {
  try {
    const name = yield select(getName);
    console.log('fetchUsers for:', name);

    const result = yield call(
      getUserInformation,
      name
    );
    yield put(success(result));
  } catch (error) {
    yield put(failure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(request, fetchUsers);
}
