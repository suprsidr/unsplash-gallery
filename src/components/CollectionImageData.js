import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getCollectionPhotos, getCollectionInfo } from '../services/lambda-service';
import { initialState, initialPhotoState, collectionListState } from './Provider';

const CollectionImageData = ({ children, id }) => {

  const [ state, setState ] = useRecoilState(initialState);
  const [ collectionInfo, setCollectionInfo ] = useState(null);

  const { collectionListItems } = useRecoilValue(collectionListState);

  // if we end up here from a direct link and not from collectionList we need to fetch collection info
  const fetchCollectionInfo = async () => {
    const json = await getCollectionInfo({ id });
    if (json.results) {
      const { id, title, cover_photo: coverPhoto, total_photos: totalPhotos, links, user } = json.results;

      setCollectionInfo({ id, title, coverPhoto, totalPhotos, links, user });
    }
  }

  useEffect(() => {
    setState(initialPhotoState);
    const info = collectionListItems.find(collection => collection.id === id);
    if(info) {
      setCollectionInfo(info);
    } else {
      fetchCollectionInfo();
    }

  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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
      ...state,
      page: page + 1,
      photoItems: [...state.photoItems, ...results],
      endOfData: results.length < perPage
    });
  }

  return (
    <>
      {collectionInfo &&
        <Row>
          <Col>
            <div className="text-center">
              <h4>{collectionInfo.title || 'No title'}</h4>
              <p className="by-line">By: {`${collectionInfo.user.first_name || ''} ${collectionInfo.user.last_name || ''}`}</p>
              <p>Total Photos: {collectionInfo.totalPhotos}</p>
            </div>
          </Col>
        </Row>}
      { React.cloneElement(children, { fetchMore, error }) }
    </>
  )
}

export default CollectionImageData;
