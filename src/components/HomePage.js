import React from 'react';
import { navigate } from 'hookrouter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { initialState } from './Provider';

import './homePage.scss';
import { useSetRecoilState } from 'recoil';

const HomePage = () => {
  const setState = useSetRecoilState(initialState);

  const goto = (e, where) => {
    e.preventDefault();
    setState(initialState);
    navigate(where);
  }

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Welcome to cats&nbsp;or&nbsp;dogs.</h1>
          <h2>Make your choice!</h2>
        </Col>
      </Row>
      <Row className="cats-n-dogs">
        <Col className="text-center">
          <a href="/collections/cats" onClick={(e) => goto(e, '/collections/cats')}>
            <Image src="/cat.png" alt="cat" />
          </a>
        </Col>
        <Col className="text-center">
          <a href="/collections/dogs" onClick={(e) => goto(e, '/collections/dogs')}>
            <Image src="/dog.png" alt="dog" />
          </a>
        </Col>
      </Row>
    </>
  )
}

export default HomePage;
