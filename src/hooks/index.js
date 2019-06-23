import { noop } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, useDispatch, useMappedState } from 'redux-react-hook';
import { push, replace } from 'connected-react-router';
import qs from 'query-string';
import { call } from 'redux-saga/effects';

import * as api from 'api';
import * as selectors from 'selectors';
import token from 'token';
import { matchRoute } from 'routes';
import { useRefresh, REFRESH_EVENT } from './useRefresh';
import { useAsyncTask, useAsyncRun } from './useAsyncTask';

export { useRefresh };

export function useForceUpdate() {
  const [it, setIt] = useState(false);
  return () => setIt(!it);
}

export function useToken() {
  const [value, setValue] = useState(token.value);
  useEffect(() => token.subscribe(setValue), []);
  return value;
}

export function useStore() {
  return useContext(StoreContext);
}

export function useSaga(fn, { args = [], norefresh = false, onResult = noop } = {}) {
  const store = useStore();
  return (...callArgs) => {
    return store.runSaga(
      function*(...args) {
        const result = yield call(fn, ...args);

        if (onResult) {
          onResult(result);
        }

        if (!norefresh) {
          window.dispatchEvent(new CustomEvent(REFRESH_EVENT));
        }

        return result;
      },
      ...args,
      ...callArgs,
    );
  };
}

export function useCurrentUser() {
  const { currentUser } = useMappedState(selectors.currentUser);
  return currentUser || {};
}

export function useLocation() {
  const { location } = useMappedState(selectors.currentLocation);
  return location;
}

export function useNavigate(useReplace) {
  const dispatch = useDispatch();
  return ({ pathname, params }) => {
    const action = (useReplace ? replace : push)({
      pathname,
      search: params ? qs.stringify(params) : undefined,
    });
    dispatch(action);
  };
}

export function useSearchParams() {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const replaceParams = params => {
    dispatch(
      replace({
        pathname: location.pathname,
        search: params.toString(),
      }),
    );
  };
  return {
    location,
    dispatch,
    params,
    replaceParams,
    replaceParam(name, value) {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      replaceParams(params);
    },
  };
}

export const useFetch = (fn, makeParams = () => ({}), delay = 0) => {
  const location = useLocation();

  const task = useAsyncTask(
    async (abortController, args = {}) => {
      const range = api.paginationParams(location.search);
      const params = makeParams(new URLSearchParams(location.search));
      const route = matchRoute(location);
      const routeParams = route ? route.params : {};
      const data = await fn({ abortController, ...args, ...range, ...params, ...routeParams });
      return { ...data, ...range };
    },
    { delay },
    [location],
  );

  useAsyncRun(task);

  return task;
};
