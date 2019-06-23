// borrowed from https://github.com/dai-shi/react-hooks-async/blob/master/src/use-async-task.js
import { useEffect, useReducer } from 'react';
import { REFRESH_EVENT } from './useRefresh';
import { delay as delayPromise } from 'utils';

const initialState = {
  started: false,
  pending: true,
  error: null,
  result: null,
  start: null,
  abort: null,
  abortController: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return initialState;
    case 'ready':
      return {
        ...state,
        start: action.start,
        abort: action.abort,
      };
    case 'start':
      return {
        ...state,
        started: true,
        abortController: action.abortController,
      };
    case 'result':
      return {
        ...state,
        started: false,
        pending: false,
        result: action.result,
        abortController: null,
      };
    case 'error':
      return {
        ...state,
        started: false,
        pending: false,
        error: action.error,
        abortController: null,
      };
    case 'abort':
      return {
        ...state,
        started: false,
        pending: false,
        abortController: null,
      };
    default:
      throw new Error(`unexpected action type: ${action.type}`);
  }
};

export const useAsyncTask = (func, { delay = 0 } = {}, deps = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = async (...args) => {
    if (state.started) {
      return;
    }
    const abortController = new AbortController();
    dispatch({ type: 'start', abortController });
    try {
      await delayPromise(delay, abortController);
      const result = await func(abortController, ...args);
      dispatch({ type: 'result', result });
      return { result };
    } catch (error) {
      dispatch({ type: 'error', error });
      return { error };
    }
  };

  const abort = () => {
    if (state.abortController) {
      state.abortController.abort();
      dispatch({ type: 'abort' });
    }
  };

  useEffect(() => {
    dispatch({ type: 'ready', start, abort });
    return () => {
      dispatch({ type: 'init' });
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export function useAsyncRun(asyncTask) {
  useEffect(() => {
    const start = () => {
      if (asyncTask && asyncTask.start) {
        asyncTask.start();
      }
    };

    const abort = () => {
      if (asyncTask && asyncTask.abort) {
        asyncTask && asyncTask.abort();
      }
    };

    const listener = () => {
      start();
    };

    window.addEventListener(REFRESH_EVENT, listener);
    start();

    return () => {
      window.removeEventListener(REFRESH_EVENT, listener);
      abort();
    };
  }, [asyncTask && asyncTask.start, asyncTask && asyncTask.abort]);
}
