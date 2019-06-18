// borrowed from https://github.com/dai-shi/react-hooks-async/blob/master/src/use-async-task.js
import { useEffect, useReducer } from 'react';

const initialState = {
  started: false,
  pending: true,
  error: null,
  result: null,
  start: null,
  abort: null,
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
      if (state.started) return state; // to bail out just in case
      return {
        ...state,
        started: true,
      };
    case 'result':
      if (!state.pending) return state; // to bail out just in case
      return {
        ...state,
        started: false,
        pending: false,
        result: action.result,
      };
    case 'error':
      if (!state.pending) return state; // to bail out just in case
      return {
        ...state,
        started: false,
        pending: false,
        error: action.error,
      };
    default:
      throw new Error(`unexpected action type: ${action.type}`);
  }
};

export const useAsyncTask = (func, deps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let abortController = null;
    const start = async (...args) => {
      if (abortController) return;
      abortController = new AbortController();
      dispatch({ type: 'start' });
      try {
        const result = await func(abortController, ...args);
        dispatch({ type: 'result', result });
        abortController = null;
        return { result };
      } catch (error) {
        dispatch({ type: 'error', error });
        abortController = null;
        return { error };
      }
    };
    const abort = () => {
      if (abortController) {
        abortController.abort();
      }
    };
    dispatch({ type: 'ready', start, abort });
    return () => {
      dispatch({ type: 'init' });
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
};

export default useAsyncTask;
