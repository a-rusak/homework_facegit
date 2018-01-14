import { delay } from 'redux-saga';
import {
  select,
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import {
  request,
  success,
  failure
} from '../actions/users';
import { getUserInformation } from '../api';
import { getToken, getName } from '../reducers/auth';
import { authorize } from '../actions/auth';

function* fetchUsers(action) {
  try {
    let name = action.payload;
    const token = yield select(getToken);
    if (name) {
      yield put(authorize({ name, token }));
    } else {
      name = yield select(getName);
    }
    console.log(`fetchUsers`, name);
    const result = yield call(getUserInformation, name);
    yield delay(500); // fake loading delay
    yield put(success(result));
  } catch (error) {
    yield put(failure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(request, fetchUsers);
}
