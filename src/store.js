import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = createRootReducer(history);
  const initialState = rootReducer({}, { type: '@@INIT' });
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}

const store = configureStore();

export default store;
