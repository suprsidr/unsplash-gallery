import React from 'react';
import { useRoutes } from 'hookrouter';

import HomePage from './HomePage';
import NotFound from './NotFound';
import CollectionList from './CollectionList';
import CollectionImageData from './CollectionImageData';
import PhotoSearchData from './PhotoSearchData';
import PhotoGrid from './PhotoGrid';

const Router = () => {
  /* eslint-disable */
  const routes = {
    '/': () => <HomePage />,
    '/cats': () => (
      <PhotoSearchData query="cats" >
        <PhotoGrid />
      </PhotoSearchData>
    ),
    '/dogs': () => (
      <PhotoSearchData query="dogs" >
        <PhotoGrid />
      </PhotoSearchData>
    ),
    '/collections/:query': ({ query }) => <CollectionList query={query} />,
    '/photos/:id': ({ id }) => (
      <CollectionImageData id={id} >
        <PhotoGrid />
      </CollectionImageData>
    )
  };
  /* eslint-enable */

  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default Router;
