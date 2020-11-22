import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Router from "./Router";
import AppNavBar from "./AppNavBar";

const Page = () => {
  return (
    <Container className="p-3">
      <Row style={{ marginBottom: "56px" }}>
        <Col>
          <AppNavBar />
        </Col>
      </Row>
      <Router />
    </Container>
  );
};

export default Page;
