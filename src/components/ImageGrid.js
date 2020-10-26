import React, { useEffect, useContext, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from './Provider';
import { download } from '../services/download-service';
import { getCollection } from '../services/lambda-service';

import './imageGrid.scss';

const ImageGrid = ({ query }) => {
  const { state, setState } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getCollection({ page, perPage, query });
    if (json.results) {
      results = json.results.map(({ id, created_at: created, description, alt_description: altDescription, urls, links, likes, user }) =>
        ({ id, created, description, altDescription, urls, links, likes, user }));
    }
    setState({ page: page + 1, photoItems: [...state.photoItems, ...results] });
  };

  const [modalState, setModalState] = useState({
    id: '',
    created: '',
    description: '',
    altDescription: '',
    urls: {},
    links: {},
    likes: 0,
    user: {}
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '0px'
  });

  /* eslint-disable */
  // eslint exhaustive-deps rule would have me break this functionality
  useEffect(async () => {
    if (inView) {
      // Fire event when our intersection observer is coming into view
      console.log('Section shown');
      fetchMore();
    }
  }, [inView]);
  /* eslint-enable */

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2
  };

  const showModal = ({ e, id, created, description, altDescription, urls, links, likes, user }) => {
    e.preventDefault();
    setModalState({ id, created, description, altDescription, urls, links, likes, user });
    setShow(true)
  }

  return (
    <>
      <Row>
        <Col>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {state.photoItems.map(({ id, created, description, altDescription, urls, links, likes, user }, i) => (
              <div key={id + i}>
                <a href={links.download} onClick={(e) => showModal({ e, id, created, description, altDescription, urls, links, likes, user })}>
                  <Image src={urls.small} alt={description || altDescription || 'No description'} thumbnail />
                </a>
              </div>
            ))}
          </Masonry>
        </Col>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {modalState.description || modalState.altDescription || 'No description'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Row>
              <Col>
                <a href={modalState.links.download} onClick={async e => await download(e, modalState.id)}>
                  <Image src={modalState.urls.full} alt={modalState.description || modalState.altDescription || 'No description'} thumbnail />
                </a>
              </Col>
            </Row>
            <Row>
              <Col className="text-center by-line">
                <p>By: {`${modalState.user.first_name} ${modalState.user.last_name}`} Likes: {modalState.likes}</p>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
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
  );
}

export default ImageGrid;
