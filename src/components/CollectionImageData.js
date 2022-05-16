import { Link as A } from "raviger";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    getCollectionInfo, getCollectionPhotos
} from "../services/lambda-service";
import {
    collectionListState, initialPhotoState, initialState
} from "./Provider";

const CollectionImageData = ({ children, id }) => {
  const [state, setState] = useRecoilState(initialState);
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
    setState(initialPhotoState);
    const info = collectionListItems.find((collection) => collection.id === id);
    if (info) {
      setCollectionInfo(info);
    } else {
      fetchCollectionInfo();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getCollectionPhotos({ page, id });
    if (json.results) {
      results = json.results.map(
        ({
          id,
          description,
          alt_description: altDescription,
          urls,
          links,
          likes,
          user,
        }) => ({ id, description, altDescription, urls, links, likes, user })
      );
    }
    const eod = !json.error && results.length < perPage;
    setState({
      ...state,
      page: page + 1,
      photoItems: [...state.photoItems, ...results],
      endOfData: eod,
      error: json.error,
      showToastMessage: (!!json.error || eod),
    });
  };

  return (
    <>
      {collectionInfo && (
        <Row>
          <Col>
            <div className="text-center">
              <h4>{collectionInfo.title || "No title"}</h4>
              <p className="by-line">
                By:{" "}
                {`${collectionInfo.user.first_name || ""} ${
                  collectionInfo.user.last_name || ""
                }`}
              </p>
              <p>Total Photos: {collectionInfo.totalPhotos}</p>
              <p>
                <A className="search-text" href={`/related/${id}`}>
                  Related
                </A>
              </p>
            </div>
          </Col>
        </Row>
      )}
      {React.cloneElement(children, { fetchMore })}
    </>
  );
};

export default CollectionImageData;
