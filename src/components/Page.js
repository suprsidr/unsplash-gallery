import React from 'react';
import { navigate } from 'hookrouter';
import Container from 'react-bootstrap/Container';
import Router from './Router';

const Page = () => {
  return (
    <Container className="p-3">
      <Router />
    </Container>
  );
};


export default Page;
