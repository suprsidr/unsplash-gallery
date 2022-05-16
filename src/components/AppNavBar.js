import { navigate } from "raviger";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRecoilState } from 'recoil';
import "./appNavBar.scss";
import { themeState } from "./Provider";

const AppNavBar = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.body.classList.add("dark");
        break;
      case "light":
        document.body.classList.remove("dark");
        break;
      default:
        break;
    }
  }, [theme]);

  const goto = (e, path) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <Navbar variant={theme} bg={theme} fixed="top">
      <Nav className="mr-auto">
        <Nav.Link href="/" onClick={(e) => goto(e, "/")}>
          Home
        </Nav.Link>
        <Nav.Link href="/about" onClick={(e) => goto(e, "/about")}>
          About
        </Nav.Link>
        <Nav.Link
          href="/collections/dogs"
          onClick={(e) => goto(e, "/collections/dogs")}
        >
          Dogs
        </Nav.Link>
        <Nav.Link
          href="/collections/cats"
          onClick={(e) => goto(e, "/collections/cats")}
        >
          Cats
        </Nav.Link>
      </Nav>
      <Form inline>
        <Form.Check
          type="switch"
          id="theme-switch"
          label="Light/Dark"
          checked={theme === "dark"}
          onChange={(e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            localStorage.setItem('savedTheme', newTheme);
            setTheme(newTheme);
          }}
        />
      </Form>
    </Navbar>
  );
};

export default AppNavBar;
