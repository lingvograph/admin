import { useContext, useState, useEffect } from 'react';
import { StoreContext, useDispatch, useMappedState } from 'redux-react-hook';
import { useAsyncRun, useAsyncCombineSeq } from 'react-hooks-async';
import useAsyncTaskDelay from 'react-hooks-async/dist/use-async-task-delay';
import { replace } from 'connected-react-router';
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

export function useLocation() {
  const { location } = useMappedState(selectors.currentLocation);
  return location;
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

export const useFetchList = (fetchList, makeParams = () => ({}), delay = 0) => {
  const location = useLocation();
  const delayTask = useAsyncTaskDelay(delay, [location]);

  const task = useAsyncTask(
    async (abortController, args = {}) => {
      const range = api.paginationParams(location.search);
      const params = makeParams(new URLSearchParams(location.search));
      const data = await fetchList({ abortController, ...args, ...range, ...params });
      return { ...data, ...range };
    },
    [location],
  );

  const combinedTask = useAsyncCombineSeq(delayTask, task);

  useAsyncRun(combinedTask);

  return task;
};

export const useFetchItem = fetchItem => {
  const location = useLocation();

  const task = useAsyncTask(
    async (abortController, args = {}) => {
      const route = matchRoute(location);
      const params = route ? route.params : {};
      const data = await fetchItem({ abortController, ...args, ...params });
      return data;
    },
    [location],
  );

  useAsyncRun(task);

  return task;
};

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
    await task.start(args);

    if (fetchTask) {
      await fetchTask.start();
    }
  };
};
