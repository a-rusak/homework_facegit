import { authorize, logout } from '../actions/auth';
import { request } from '../actions/users';
import { take, put, call, select, takeLatest } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi } from '../api';
import { getIsAuthorized } from '../reducers/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';

export function* authFlow() {
  console.log('authFlow');
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield put(authorize());
        console.log('put(authorize()');
      } else {
        const action = yield take(authorize);
        token = action.payload;
        console.log('yield take(authorize)');
      }
      console.log('localStorageToken');
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield put(request());
    console.log('saga');

    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

export function* setTokenWatch() {
  yield takeLatest(authorize, authFlow);
}
