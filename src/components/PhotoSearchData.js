import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { getPhotos } from '../services/lambda-service';
import { initialState, initialPhotoState } from './Provider';

const PhotosSearchData = ({ children, query }) => {

  const [ state, setState ] = useRecoilState(initialState);

  useEffect(() => {
    setState(initialPhotoState);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  let error = false;

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getPhotos({ page, perPage, query });
    if (json.results) {
      results = json.results.map(({ id, description, alt_description: altDescription, urls, links, likes, user }) =>
        ({ id, description, altDescription, urls, links, likes, user }))
    }

    error = json.error;

    setState({
      ...state,
      page: page + 1,
      photoItems: [...state.photoItems, ...results],
      endOfData: results.length < perPage
    });
  }

  return React.cloneElement(children, { fetchMore, error });
}

export default PhotosSearchData;