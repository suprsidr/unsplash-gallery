import React, { useContext } from 'react';
import { navigate } from 'hookrouter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { AppContext, initialState } from './Provider';

const HomePage = () => {
  const { setState } = useContext(AppContext);

  const goto = (e, where) => {
    e.preventDefault();
    setState(initialState);
    navigate(where);
  }

  return (
    <>
      <Row>
        <Col className="text-center">
          <h1>Welcome to cats or dogs.</h1>
          <h2>Make your choice!</h2>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <a href="/cats" onClick={(e) => goto(e, '/cats')}>
            <Image src="/cat.png" alt="cat" />
          </a>
        </Col>
        <Col className="text-center">
          <a href="/dogs" onClick={(e) => goto(e, '/dogs')}>
            <Image src="/dog.png" alt="dog" />
          </a>
        </Col>
      </Row>
    </>
  )
}

export default HomePage;