import React from 'react';
import { A } from 'hookrouter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './homePage.scss';

const HomePage = () => {

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
          <A href="/collections/cats">
            <Image src="/cat.png" alt="cat" />
          </A>
        </Col>
        <Col className="text-center">
          <A href="/collections/dogs">
            <Image src="/dog.png" alt="dog" />
          </A>
        </Col>
      </Row>
    </>
  )
}

export default HomePage;
