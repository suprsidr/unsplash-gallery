import React, { useEffect, useState } from "react";
import { A } from "hookrouter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { useRecoilState, useRecoilValue } from "recoil";
import { collectionListState, initialCollectionListState } from "./Provider";
import {
  getRelatedCollections,
  getCollectionInfo,
} from "../services/lambda-service";

import "./collectionList.scss";

const RelatedCollectionList = ({ id }) => {
  const [state, setState] = useRecoilState(collectionListState);
  const [collectionInfo, setCollectionInfo] = useState(null);
  const { collectionListItems } = useRecoilValue(collectionListState);

  // if we end up here from a direct link and not from collectionList we need to fetch collection info
  const fetchCollectionInfo = async () => {
    const json = await getCollectionInfo({ id });
    if (json.results) {
      const {
        id,
        title,
        cover_photo: coverPhoto,
        total_photos: totalPhotos,
        links,
        user,
      } = json.results;

      setCollectionInfo({ id, title, coverPhoto, totalPhotos, links, user });
    }
  };

  useEffect(() => {
    const info = collectionListItems.find((collection) => collection.id === id);
    if (info) {
      setCollectionInfo(info);
    } else {
      fetchCollectionInfo();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setState(initialCollectionListState);
    fetchMore();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMore = async () => {
    let results = [];
    const json = await getRelatedCollections({ id });
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
      page: 0,
      collectionListItems: results,
      endOfData: true, // no pagenation for related
      error: json.error,
    });
  };

  return (
    <>
      {collectionInfo && (
        <Row>
          <Col>
            <div className="text-center">
              <h4>
                Collections related to &quot;
                {collectionInfo.title || "No title"}&quot;
              </h4>
              <p className="by-line">
                By:{" "}
                <A href={`/users/${collectionInfo.user.username}`}>{`${
                  collectionInfo.user.first_name || ""
                } ${collectionInfo.user.last_name || ""}`}</A>
              </p>
            </div>
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
                <A href={`/users/${collectionItem.user.username}`}>{`${
                  collectionItem.user.first_name || ""
                } ${collectionItem.user.last_name || ""}`}</A>
              </p>
            </div>
          </Col>
          <p>&nbsp;</p>
        </Row>
      ))}
      {!state.error && !state.endOfData && (
        <Row>
          <Col>
            <div className="text-center">
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

export default RelatedCollectionList;
