import {
  take,
  put,
  call,
  select,
  takeLatest
} from 'redux-saga/effects';
import { authorize, logout } from '../actions/auth';
import { request, success } from '../actions/users';
import { setTokenApi, clearTokenApi } from '../api';
import {
  getIsAuthorized,
  getToken,
  getName
} from '../reducers/auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(
      getTokenFromLocalStorage
    );
    let token;

    console.log(
      'isAuthorized:',
      isAuthorized,
      'localStorageToken:',
      localStorageToken
    );

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        const name = yield select(getName);
        yield put(authorize({name, token}));
        console.log('put authorize');
      } else {
        yield take(authorize);
        console.log('take authorize');
        token = yield select(getToken);
      }
    }

    token = yield select(getToken);
    yield call(setTokenApi, token);
    yield put(request());
    yield take(success);
    yield call(setTokenToLocalStorage, token);

    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

export function* setTokenWatch() {
  yield takeLatest(authorize, authFlow);
}
