import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';
import { createSelector } from 'reselect';
import { useToken } from '../token';

const selectIsLoggedIn = createSelector(
  state => !!state.common.currentUser,
  t => t,
);

const ProtectedRoute = ({ component: Component, render, ...pageProps }) => {
  const token = useToken();
  const isLoggedIn = useMappedState(selectIsLoggedIn);

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
