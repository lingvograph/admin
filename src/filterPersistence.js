import { take } from 'redux-saga/effects';
import { LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'connected-react-router';

export function* persistFilters() {
  while (true) {
    const action = yield take(a => a.type === LOCATION_CHANGE || a.type === CALL_HISTORY_METHOD);
    // if page is not changed save query string for given path
    // on page change without query string restore previous query string
  }
}
