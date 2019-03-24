import { useContext, useState, useEffect } from 'react';
import { StoreContext, useMappedState } from 'redux-react-hook';
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
  const [data, setData] = useState({ items: [], total: 0, ...params });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const params = api.paginationParams(location.search);
      const { items, total } = await fetch(params);
      if (!cancelled) {
        setData({ items, total, ...params });
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [{ ...params }]);

  return data;
};
