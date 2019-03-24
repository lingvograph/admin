import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router';
import { setCurrentUser } from './actions';

const GlobalState = Immutable.Record({
  currentUser: undefined,
});

const commonReducer = handleActions(
  {
    [setCurrentUser]: (state, action) => {
      return state.set('currentUser', action.payload);
    },
  },
  GlobalState(),
);

export default history =>
  combineReducers({
    common: commonReducer,
    router: connectRouter(history),
  });
