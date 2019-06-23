import { useEffect } from 'react';

export const REFRESH_EVENT = 'refresh';

export function useRefresh(onRefresh) {
  useEffect(() => {
    const listener = () => {
      onRefresh();
    };

    window.addEventListener(REFRESH_EVENT, listener);

    return () => {
      window.removeEventListener(REFRESH_EVENT, listener);
    };
  }, [onRefresh]);
}
