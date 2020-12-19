import React, { useEffect } from "react";
import { A } from "hookrouter";
import { useInView } from "react-intersection-observer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState } from "recoil";
import { collectionListState, initialCollectionListState } from "./Provider";
import { getUserCollections } from "../services/lambda-service";

import "./collectionList.scss";

const CollectionList = ({ userName }) => {
  const [state, setState] = useRecoilState(collectionListState);
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "0px",
  });

  useEffect(() => {
    setState(initialCollectionListState);
  }, [userName]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getUserCollections({ page, userName });
    if (json.results) {
      results = json.results.map(
        ({
          id,
          title,
          cover_photo: coverPhoto,
          total_photos: totalPhotos,
          links,
          user,
        }) => ({ id, title, coverPhoto, totalPhotos, links, user })
      );
    }
    setState({
      ...state,
      page: page + 1,
      collectionListItems: [...state.collectionListItems, ...results],
      endOfData: (json.results || []).length < perPage,
      error: json.error,
    });
  };

  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {state.collectionListItems && state.collectionListItems[0] && (
        <Row>
          <Col className="text-center">
            <h2 className="collection-title">
              Collections by{" "}
              <span className="by-line">{`${
                state.collectionListItems[0].user.first_name || ""
              } ${state.collectionListItems[0].user.last_name || ""}`}</span>
            </h2>
            <p>&nbsp;</p>
          </Col>
        </Row>
      )}
      {state.collectionListItems.map((collectionItem, index) => (
        <Row key={collectionItem.id + index}>
          <Col xs={12} md={6}>
            <A
              data-testid={collectionItem.id + index}
              href={`/photos/${collectionItem.id}`}
            >
              <Image
                src={collectionItem.coverPhoto.urls.small}
                alt={collectionItem.title || "No title"}
                thumbnail
              />
            </A>
          </Col>
          <Col xs={12} md={6} className="collection-info">
            <div className="text-center">
              <h5>{collectionItem.title || "No title"}</h5>
              <p>Total Photos: {collectionItem.totalPhotos}</p>
              <p className="by-line">
                By:{" "}
                {`${collectionItem.user.first_name || ""} ${
                  collectionItem.user.last_name || ""
                }`}
              </p>
            </div>
          </Col>
          <p>&nbsp;</p>
        </Row>
      ))}
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

export default CollectionList;
