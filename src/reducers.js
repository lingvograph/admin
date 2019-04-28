import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router';
import { setCurrentUser } from './actions';
import { gravatarURL } from 'utils';

const GlobalState = Immutable.Record({
  currentUser: undefined,
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
  },
  GlobalState(),
);

export default history =>
  combineReducers({
    common: commonReducer,
    router: connectRouter(history),
  });
