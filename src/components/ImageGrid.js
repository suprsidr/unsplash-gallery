import React, { useEffect, useContext, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from './Provider';
import { getCollection } from '../services/lambda-service';

import './imageGrid.scss';

const ImageGrid = ({ query }) => {
  const { state, setState } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState({
    id: '',
    index: 0,
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

  useEffect(() => {
    if (inView) {
      async function fetchMore() {
        const { page, perPage } = state;
        let results = [];
        const json = await getCollection({ page, perPage, query });
        if (json.results) {
          results = json.results.map(({ id, created_at: created, description, alt_description: altDescription, urls, links, likes, user }) =>
            ({ id, created, description, altDescription, urls, links, likes, user }));
        }
        setState({ page: page + 1, photoItems: [...state.photoItems, ...results] });
      }
      fetchMore();
    }
  }, [inView, query, state, setState]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2
  };

  const showModal = (e, index) => {
    e.preventDefault();
    setModalState(state.photoItems[index]);
    setCurrent(index);
    setShow(true);
    setLoading(true);
    // next tick
    setTimeout(() => {
      const el = document.querySelector('.current');
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 0);
  }

  const prev = e => {
    let index = current - 1;
    if (index < 0) {
      index = 0;
    }
    showModal(e, index);
  }

  const next = e => {
    let index = current + 1;
    if (index === state.photoItems.length) {
      index = state.photoItems.length - 1;
    }
    showModal(e, index);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {query === 'cats' && <Nav.Link href="/dogs">Dogs</Nav.Link>}
            {query === 'dogs' && <Nav.Link href="/cats">Cats</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Row>
        <Col>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {state.photoItems.map((photoItem, index) => (
              <div key={photoItem.id + index}>
                <a href={photoItem.links.download} onClick={(e) => showModal(e, index)} className={current === index ? 'current' : ''}>
                  <Image src={photoItem.urls.small} alt={photoItem.description || photoItem.altDescription || 'No description'} thumbnail />
                </a>
              </div>
            ))}
          </Masonry>
        </Col>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modalState.description || modalState.altDescription || 'No description'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Row>
              <Col>
                <Image onLoad={() => setLoading(false)} src={modalState.urls.full} alt={modalState.description || modalState.altDescription || 'No description'} thumbnail />
                {loading &&
                <div className="imageLoading text-center">
                  <Spinner animation="grow" variant="warning" />
                </div>}
                <div className="arrows">
                  <div>
                    <span className="float-left" onClick={(e) => prev(e)}><BsFillCaretLeftFill size={96} /></span>
                    <span className="float-right" onClick={(e) => next(e)}><BsFillCaretRightFill size={96} /></span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center by-line">
                <span>By: {`${modalState.user.first_name || ''} ${modalState.user.last_name || ''}`}<br />Likes: {modalState.likes}</span>
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
