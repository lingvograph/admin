import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StoreContext } from 'redux-react-hook';
import { ConnectedRouter } from 'connected-react-router';
import './index.scss';
import { history } from './history';
import store from './store';
import { rootSaga } from './saga';
import App from './App';
import * as serviceWorker from './serviceWorker';

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </StoreContext.Provider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
