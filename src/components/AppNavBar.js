import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { navigate } from 'hookrouter';

export const AppNavBar = () => {

  const goto = (e, path) => {
    e.preventDefault();
    navigate(path);
  }
  return (
    <Navbar bg="light" fixed="top">
      <Nav className="mr-auto">
        <Nav.Link href="/" onClick={e => goto(e, '/')}>Home</Nav.Link>
        <Nav.Link href="/collections/dogs" onClick={e => goto(e, '/collections/dogs')}>Dogs</Nav.Link>
        <Nav.Link href="/collections/cats" onClick={e => goto(e, '/collections/cats')}>Cats</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default AppNavBar
