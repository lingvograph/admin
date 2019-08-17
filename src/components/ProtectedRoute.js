import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import * as selectors from 'selectors';
import { useToken } from 'hooks';

const ProtectedRoute = ({ component: Component, render, ...pageProps }) => {
  const token = useToken();
  const { isLoggedIn } = useMappedState(selectors.isLoggedIn);

  const protectedRender = props => {
    if (token) {
      if (isLoggedIn) {
        return render ? render(props) : <Component {...props} />;
      }
      // TODO display some cool preloader
      return null;
    }
    // TODO support return_url
    const redirectTo = {
      pathname: '/login',
    };
    return <Redirect to={redirectTo} />;
  };

  return <Route render={protectedRender} {...pageProps} />;
};

export default ProtectedRoute;
