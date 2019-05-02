import React from 'react';
import warning from 'warning';
import { matchPath } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./pages/Users/Users'));
const User = React.lazy(() => import('./pages/Users/User'));
const Terms = React.lazy(() => import('./pages/Terms/Terms'));
const Term = React.lazy(() => import('./pages/Terms/Term'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/terms', exact: true, name: 'Terms', component: Terms },
  { path: '/terms/:id', exact: true, name: 'Term Details', component: Term },
];

export function resolvePath(routeName) {
  warning(!!routeName, 'route name is not defined');

  if (routeName.indexOf('/') >= 0) {
    return routeName;
  }

  const route = routes.find(t => t.name.toLowerCase() === routeName.toLowerCase());
  if (!route) {
    warning(false, `bad route name ${routeName}`);
    return undefined;
  }

  return route.path;
}

export function matchRoutes(location) {
  const results = [];
  for (const route of routes) {
    const match = matchPath(location.pathname, route);
    if (!match) continue;
    const result = { ...match, route };
    if (match.exact) {
      return [result];
    }
    results.push(result);
  }
  return results;
}

export function matchRoute(location) {
  const result = matchRoutes(location);
  if (result.length > 0) {
    return result[0];
  }
  return undefined;
}

export default routes;
