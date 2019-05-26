import { useContext, useState, useEffect } from 'react';
import { StoreContext, useDispatch, useMappedState } from 'redux-react-hook';
import { useAsyncRun, useAsyncCombineSeq } from 'react-hooks-async';
import useAsyncTaskDelay from 'react-hooks-async/dist/use-async-task-delay';
import { push, replace } from 'connected-react-router';
import qs from 'query-string';

import * as api from 'api';
import * as selectors from 'selectors';
import token from 'token';
import { matchRoute } from 'routes';
import useAsyncTask from './useAsyncTask';

export function useToken() {
  const [value, setValue] = useState(token.value);
  useEffect(() => token.subscribe(setValue), []);
  return value;
}

export function useStore() {
  return useContext(StoreContext);
}

export function useSaga(saga, ...args) {
  const store = useStore();
  return () => {
    store.runSaga(saga, ...args);
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
  const delayTask = useAsyncTaskDelay(delay, [location]);

  const task = useAsyncTask(
    async (abortController, args = {}) => {
      const range = api.paginationParams(location.search);
      const params = makeParams(new URLSearchParams(location.search));
      const route = matchRoute(location);
      const routeParams = route ? route.params : {};
      const data = await fn({ abortController, ...args, ...range, ...params, ...routeParams });
      return { ...data, ...range };
    },
    [location],
  );

  const combinedTask = useAsyncCombineSeq(delayTask, task);

  useAsyncRun(combinedTask);

  return task;
};

// TODO revise/remove this hook
export const useSubmit = (update, fetchTask) => {
  const location = useLocation();

  const task = useAsyncTask(
    async (abortController, args = {}) => {
      const data = await update({ abortController, ...args });
      return data;
    },
    [location],
  );

  return async args => {
    const state = await task.start(args);

    if (fetchTask) {
      await fetchTask.start();
    }

    return state.result;
  };
};
