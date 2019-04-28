import { useContext, useState, useEffect } from 'react';
import { StoreContext, useMappedState } from 'redux-react-hook';
import { useAsyncTask, useAsyncRun, useAsyncCombineSeq } from 'react-hooks-async';
import useAsyncTaskDelay from 'react-hooks-async/dist/use-async-task-delay';
import * as api from 'api';
import * as selectors from 'selectors';
import token from 'token';
import { matchRoute } from 'routes';

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

export const useLocation = () => {
  const { location } = useMappedState(selectors.currentLocation);
  return location;
};

export const useFetchList = (fetchList, makeParams = () => ({}), delay = 0) => {
  const location = useLocation();
  const delayTask = useAsyncTaskDelay(delay, [location]);

  const task = useAsyncTask(async (abortController) => {
    const range = api.paginationParams(location.search);
    const params = makeParams(new URLSearchParams(location.search));
    const data = await fetchList({ abortController, ...range, ...params });
    return { ...data, ...range };
  }, [location]);

  const combinedTask = useAsyncCombineSeq(delayTask, task);

  useAsyncRun(combinedTask);

  return task;
};

export const useFetchItem = fetchItem => {
  const location = useLocation();

  const task = useAsyncTask(async (abortController) => {
    const route = matchRoute(location);
    const params = route ? route.params : {};
    const data = await fetchItem({ abortController, ...params });
    return data;
  }, [location]);

  useAsyncRun(task);

  return task;
};
