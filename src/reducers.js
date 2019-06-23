import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router';
import { setCache, setCurrentUser } from './actions';
import { gravatarURL } from 'utils';

const GlobalState = Immutable.Record({
  currentUser: undefined,
  cache: new Immutable.Map(),
});

const commonReducer = handleActions(
  {
    [setCurrentUser]: (state, action) => {
      const user = Object.assign({}, action.payload);
      if (!user.avatar) {
        user.avatar = gravatarURL(user.email);
      }
      return state.set('currentUser', user);
    },
    [setCache]: (state, { payload: { key, value } }) => {
      const cache = state.cache.set(key, value);
      return state.set('cache', cache);
    },
  },
  GlobalState(),
);

export default history =>
  combineReducers({
    common: commonReducer,
    router: connectRouter(history),
  });
