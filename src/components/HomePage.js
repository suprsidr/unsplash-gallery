import React, { useRef } from "react";
import { A, navigate } from "hookrouter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";

import "./homePage.scss";

const HomePage = () => {
  const searchInput = useRef();

  const onKeyUpHandler = (e) => {
    if (e.charCode === 13) {
      if (e.target.value) {
        navigate(`/collections/${searchInput.current.value}`);
      }
    }
  };

  const onClickHandler = () => {
    if (searchInput.current.value) {
      navigate(`/collections/${searchInput.current.value}`);
    }
  };

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
      <Row className="search-block">
        <Col xs={12} md={3} lg={4}></Col>
        <Col xs={12} md={6} lg={4} className="text-center">
          <p>Need more than cats or dogs?</p>
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for your favorite"
                aria-label="Search for your favorite"
                aria-describedby="Search Text"
                onKeyPress={onKeyUpHandler}
                ref={searchInput}
              />
              <InputGroup.Append>
                <Button onClick={onClickHandler} variant="outline-warning">
                  <BsSearch />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
        <Col xs={12} md={3} lg={4}></Col>
      </Row>
    </>
  );
};

export default HomePage;
