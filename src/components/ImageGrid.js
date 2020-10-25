import React, { useContext, useState } from 'react';
import Masonry from 'react-masonry-css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from './Provider';
import { download } from '../services/download-service';

import './masonry.scss';

const ImageGrid = ({ query }) => {
  const { state, fetchMore } = useContext(AppContext);
  const [show, setShow] = useState(false);

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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const showModal = ({ e, id, created, description, altDescription, urls, links, likes, user }) => {
    e.preventDefault();
    setModalState({ id, created, description, altDescription, urls, links, likes, user });
    setShow(true)
  }

  if (state.photoItems.length === 0) {
    const { page, perPage } = state;
    fetchMore({ page: page + 1, perPage, query });
  }

  return (
    <Row>
      <Col>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {state.photoItems.map(({ id, created, description, altDescription, urls, links, likes, user }) => (
            <div key={id}>
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
        <Modal.Body>
          <p className="text-center">
            <a href={modalState.links.download} onClick={async e => await download(e, modalState.id)}>
              <Image src={modalState.urls.full} alt={modalState.description || modalState.altDescription || 'No description'} thumbnail />
            </a>
          </p>
          <p>Likes: {modalState.likes}</p>
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default ImageGrid;
