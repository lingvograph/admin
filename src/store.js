import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import { history } from './history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
