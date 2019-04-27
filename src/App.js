import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import loading from './components/Loading';
import './App.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Page401 = React.lazy(() => import('./pages/Page401/Page401'));
const Page404 = React.lazy(() => import('./pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./pages/Page500/Page500'));

class App extends Component {
  render() {
    return (
      <div>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/401" name="Page 401" component={Page401} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
