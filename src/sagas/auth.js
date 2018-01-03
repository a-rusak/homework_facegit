import {
  take,
  put,
  call,
  select,
  takeLatest
} from 'redux-saga/effects';
import { authorize, logout } from '../actions/auth';
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
      } else {
        yield take(authorize);
        token = yield select(getToken);
      }
    }

    token = yield select(getToken);
    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);

    yield take(logout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

export function* setTokenWatch() {
  yield takeLatest(authorize, authFlow);
}
