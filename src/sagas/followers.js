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
} from '../actions/followers';
import { getUserFollowers } from '../api';
import { getName } from '../reducers/auth';

function* fetchFollowers(action) {
  try {
    const name = yield select(getName);
    console.log('fetchFollowers for:', name);

    const result = yield call(
      getUserFollowers,
      name
    );
    yield delay(700); // fake loading delay
    yield put(success(result));
  } catch (error) {
    yield put(failure(error));
  }
}

export function* fetchFollowersWatch() {
  yield takeLatest(request, fetchFollowers);
}
