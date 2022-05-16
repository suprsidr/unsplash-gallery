import { useRoutes } from "raviger";
import React from "react";
import About from "./About";
import CollectionImageData from "./CollectionImageData";
import CollectionList from "./CollectionList";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import PhotoGrid from "./PhotoGrid";
import PhotoSearchData from "./PhotoSearchData";
import RelatedCollectionList from "./RelatedCollectionList";
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
    "/related/:id": ({ id }) => <RelatedCollectionList id={id} />,
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
