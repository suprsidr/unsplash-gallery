import React, { useContext } from 'react';
import { navigate } from 'hookrouter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// import { AppContext } from './Provider';

const HomePage = () => {
  // const { state, setState } = useContext(AppContext);

  const goto = (e, where) => {
    e.preventDefault();
    navigate(where);
  }

  return (
    <Row>
      <Col className="text-center">
        <h2>Are you a <a href="/cats" onClick={(e) => goto(e, '/cats')}>cat person</a> or a <a href="/dogs" onClick={(e) => goto(e, '/dogs')}>dog person</a>?</h2>
      </Col>
    </Row>
  )
}

export default HomePage;
