import React, { useContext } from 'react'
import { AppContext } from './Provider';
import { getCollectionPhotos } from '../services/lambda-service';

const CollectionImageData = ({ children, id }) => {

  const { state, setState } = useContext(AppContext);

  let error = false;

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getCollectionPhotos({ page, perPage, id });
    if (json.results) {
      results = json.results.map(({ id, description, alt_description: altDescription, urls, links, likes, user }) =>
        ({ id, description, altDescription, urls, links, likes, user }));
    }

    error = json.error;

    setState({
      page: page + 1,
      photoItems: [...state.photoItems, ...results],
      endOfData: results.length < perPage
    });
  }

  return React.cloneElement(children, { fetchMore, error });
}

export default CollectionImageData;
