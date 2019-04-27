import { useContext, useState, useEffect } from 'react';
import { StoreContext, useMappedState } from 'redux-react-hook';
import { useAsyncTask, useAsyncRun } from 'react-hooks-async';
import * as api from 'api';
import * as selectors from 'selectors';
import token from 'token';

export function useToken() {
  const [value, setValue] = useState(token.value);
  useEffect(() => token.subscribe(setValue));
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

export const useDataList = fetch => {
  const { location } = useMappedState(selectors.currentLocation);
  const params = api.paginationParams(location.search);

  const task = useAsyncTask(async (abortController) => {
    const { items, total } = await fetch({ abortController, ...params });
    return { items, total, params };
  }, [location]);

  useAsyncRun(task);

  return task;
};
