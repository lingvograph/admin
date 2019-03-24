import { spawn, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as api from './api';
import { setCurrentUser } from './actions';
import { resolvePath } from './routes';
import tokenStore from './token';

export function* navigate(routeName) {
  const path = resolvePath(routeName);
  if (path) {
    yield put(push(path));
  }
}

export function* login(username, password, onError) {
  try {
    const user = yield call(api.login, username, password);
    const isAdmin = (user.role || '').indexOf('admin') >= 0;
    if (isAdmin) {
      yield put(setCurrentUser(user));
      // TODO nagivate to previous page
      yield call(navigate, '/');
    } else {
      yield call(navigate, '/401');
    }
  } catch (err) {
    onError(err);
  }
}

export function* logout() {
  tokenStore.value = '';
  yield call(navigate, '/login');
}

export function* autoLogin() {
  try {
    const user = yield call(api.me);
    yield put(setCurrentUser(user));
  } catch (err) {
    yield call(navigate, '/login');
  }
}

export function* rootSaga() {
  yield spawn(autoLogin);
}
