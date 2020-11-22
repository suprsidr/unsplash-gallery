import React from "react";
import { useRoutes } from "hookrouter";

import HomePage from "./HomePage";
import About from "./About";
import NotFound from "./NotFound";
import CollectionList from "./CollectionList";
import CollectionImageData from "./CollectionImageData";
import PhotoSearchData from "./PhotoSearchData";
import PhotoGrid from "./PhotoGrid";
import UserCollectionList from "./UserCollectionList";

const Router = () => {
  /* eslint-disable */
  const routes = {
    "/": () => <HomePage />,
    "/about": () => <About />,
    "/cats": () => (
      <PhotoSearchData query="cats">
        <PhotoGrid />
      </PhotoSearchData>
    ),
    "/dogs": () => (
      <PhotoSearchData query="dogs">
        <PhotoGrid />
      </PhotoSearchData>
    ),
    "/collections/:query": ({ query }) => <CollectionList query={query} />,
    "/users/:userName": ({ userName }) => (
      <UserCollectionList userName={userName} />
    ),
    "/photos/:id": ({ id }) => (
      <CollectionImageData id={id}>
        <PhotoGrid />
      </CollectionImageData>
    ),
    "/search/:query": ({ query }) => (
      <PhotoSearchData query={query}>
        <PhotoGrid />
      </PhotoSearchData>
    ),
  };
  /* eslint-enable */

  const routeResult = useRoutes(routes);

  return routeResult || <NotFound />;
};

export default Router;
