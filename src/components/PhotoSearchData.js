import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getPhotos } from "../services/lambda-service";
import { initialState, initialPhotoState } from "./Provider";

const PhotosSearchData = ({ children, query }) => {
  const [state, setState] = useRecoilState(initialState);

  useEffect(() => {
    setState(initialPhotoState);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMore = async () => {
    const { page, perPage } = state;
    let results = [];
    const json = await getPhotos({ page, query });
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
      {query && (
        <Row>
          <Col>
            <div className="text-center">
              <h4>Search results for &quot;{query}&quot;</h4>
              <p>&nbsp;</p>
            </div>
          </Col>
        </Row>
      )}
      {React.cloneElement(children, { fetchMore })}
    </>
  );
};

export default PhotosSearchData;
