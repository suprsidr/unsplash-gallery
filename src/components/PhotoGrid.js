import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { useRecoilValue } from "recoil";
import { initialState } from "./Provider";

import "./photoGrid.scss";

const PhotoGrid = ({ fetchMore }) => {
  const state = useRecoilValue(initialState);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState();
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState({
    id: "",
    index: 0,
    description: "",
    altDescription: "",
    urls: {},
    links: {},
    likes: 0,
    user: {},
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  const showModal = (e, index) => {
    e.preventDefault();
    setModalState(state.photoItems[index]);
    setCurrent(index);
    setShow(true);
    setLoading(true);
    // next tick
    setTimeout(() => {
      const el = document.querySelector(".current");
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 0);
  };

  const prev = (e) => {
    let index = current - 1;
    if (index < 0) {
      index = state.photoItems.length - 1;
    }
    showModal(e, index);
  };

  const next = (e) => {
    let index = current + 1;
    if (index === state.photoItems.length) {
      index = 0;
    }
    showModal(e, index);
  };

  return (
    <>
      <Row>
        <Col>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {state.photoItems.map((photoItem, index) => (
              <a
                key={photoItem.id + index}
                data-testid={photoItem.id + index}
                href={photoItem.links.download}
                onClick={(e) => showModal(e, index)}
                className={current === index ? "current" : ""}
              >
                <Image
                  src={photoItem.urls.small}
                  alt={
                    photoItem.description ||
                    photoItem.altDescription ||
                    "No description"
                  }
                  thumbnail
                />
              </a>
            ))}
          </Masonry>
        </Col>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {modalState.description ||
                modalState.altDescription ||
                "No description"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Row>
              <Col>
                <Image
                  onLoad={() => setLoading(false)}
                  src={modalState.urls.full}
                  alt={
                    modalState.description ||
                    modalState.altDescription ||
                    "No description"
                  }
                  thumbnail
                />
                {loading && (
                  <div className="imageLoading text-center">
                    <Spinner animation="grow" variant="warning" />
                  </div>
                )}
                <div className="arrows">
                  <div>
                    <span className="float-left icon" onClick={(e) => prev(e)}>
                      <BsFillCaretLeftFill size={96} />
                    </span>
                    <span className="float-right icon" onClick={(e) => next(e)}>
                      <BsFillCaretRightFill size={96} />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center by-line">
                <span>
                  By:{" "}
                  {`${modalState.user.first_name || ""} ${
                    modalState.user.last_name || ""
                  }`}
                  <br />
                  Likes: {modalState.likes}
                </span>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
      {!state.error && !state.endOfData && (
        <Row>
          <Col>
            <div ref={ref} className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PhotoGrid;
