import React from 'react';
import { useRoutes } from 'hookrouter';

import HomePage from './HomePage';
import NotFound from './NotFound';

const Router = () => {
  /* eslint-disable */
  const routes = {
    '/': () => <HomePage />
  };
  /* eslint-enable */

  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default Router;
