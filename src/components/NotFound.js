import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const NotFound = () => (
  <Container>
    <Row>
      <Col sm={12}>
        <div id="error">
          <h2>Oops! That page can’t be found.</h2>
          <p>
            It looks like nothing was found at this location. Maybe try one of
            the links in the menu or press back to go to the previous page.
          </p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
