import React from 'react';
import { useRoutes } from 'hookrouter';

import HomePage from './HomePage';
import NotFound from './NotFound';
import ImageGrid from './ImageGrid';
import CollectionList from './CollectionList';

const Router = () => {
  /* eslint-disable */
  const routes = {
    '/': () => <HomePage />,
    '/cats': () => <ImageGrid query="cats" />,
    '/dogs': () => <ImageGrid query="dogs" />,
    '/foo': () => <CollectionList query="cats" />
  };
  /* eslint-enable */

  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default Router;
