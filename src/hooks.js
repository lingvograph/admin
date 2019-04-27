import { useContext, useState, useEffect } from 'react';
import { StoreContext, useMappedState } from 'redux-react-hook';
import { useAsyncTask, useAsyncRun } from 'react-hooks-async';
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

export const useLocation = () => useMappedState(selectors.currentLocation);

export const useFetchList = fetchList => {
  const { location } = useLocation();

  const task = useAsyncTask(async (abortController) => {
    const params = api.paginationParams(location.search);
    const { items, total } = await fetchList({ abortController, ...params });
    return { items, total, ...params };
  }, [location]);

  useAsyncRun(task);

  return task;
};

export const useFetchItem = fetchItem => {
  const { location } = useLocation();

  const task = useAsyncTask(async (abortController) => {
    const route = matchRoute(location);
    const params = route ? route.params : {};
    const data = await fetchItem({ abortController, ...params });
    return data;
  }, [location]);

  useAsyncRun(task);

  return task;
};
