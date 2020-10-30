import React, { useEffect, useContext } from 'react';
import { navigate } from 'hookrouter';
import { useInView } from 'react-intersection-observer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from './Provider';
import { getCollectionList } from '../services/lambda-service';

import './collectionList.scss';

const CollectionList = ({ query }) => {
  const { state, setState } = useContext(AppContext);
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '0px'
  });

  const fetchMore = async () => {
    const { collectionListPage, perPage } = state;
    let results = [];
    const json = await getCollectionList({ page: collectionListPage, perPage, query });
    if (json.results) {
      results = json.results.map(({ id, title, cover_photo: coverPhoto, total_photos: totalPhotos, links, user }) =>
        ({ id, title, coverPhoto, totalPhotos, links, user }));
    }
    setState({
      collectionListPage: collectionListPage + 1, collectionListItems: [...state.collectionListItems, ...results]
    });
  };

  const goto = (e, id) => {
    setState({
      photoItems: [],
      page: 1,
      endOfData: false
    });
    navigate(`/photos/${id}`);
  }

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Row>
        <Col>
          <Navbar bg="light" fixed="top">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {query === 'cats' && <Nav.Link href="/dogs">Dogs</Nav.Link>}
              {query === 'dogs' && <Nav.Link href="/cats">Cats</Nav.Link>}
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2 className="collection-title">Collection results for: &quot;{query}&quot;</h2>
        </Col>
      </Row>
      {state.collectionListItems.map((collectionItem, index) => (
        <Row key={collectionItem.id + index}>
          <Col>
            <a data-testid={collectionItem.id + index} href={`/photos/${collectionItem.id}`} onClick={e => goto(e, collectionItem.id)}>
              <Image src={collectionItem.coverPhoto.urls.small} alt={collectionItem.title || 'No title'} thumbnail />
            </a>
          </Col>
          <Col className="collection-info">
            <div className="text-center">
              <h5>{collectionItem.title || 'No title'}</h5>
              <p>Total Photos: {collectionItem.totalPhotos}</p>
              <p className="by-line">By: {`${collectionItem.user.first_name || ''} ${collectionItem.user.last_name || ''}`}</p>
            </div>
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <div ref={ref} className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CollectionList;
