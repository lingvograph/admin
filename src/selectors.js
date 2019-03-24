import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { identity } from 'ramda';

export function composeSelector(query, makeResult = identity) {
  const selectors = Immutable.OrderedMap(query).reduce((res, selector) => res.concat(selector), []);
  return createSelector(
    selectors,
    (...results) => makeResult(Object.assign({}, ...results)),
  );
}

export const currentUser = createSelector(
  state => state.common.currentUser,
  currentUser => ({ currentUser }),
);

export const isLoggedIn = createSelector(
  state => !!state.common.currentUser,
  isLoggedIn => ({ isLoggedIn }),
);

export const currentLocation = createSelector(
  state => state.router.location || window.location,
  location => ({ location }),
);
