import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Router from "./Router";
import AppNavBar from "./AppNavBar";
import { collectionListState, initialState } from "./Provider";

const Page = () => {
  const [collectionState, setCollectionState] = useRecoilState(
    collectionListState
  );
  const [photoState, setPhotoState] = useRecoilState(initialState);

  useEffect(() => {
    if (collectionState.error || photoState.error) {
      toast.error("Oh no something went wrong!");
      setCollectionState({
        ...collectionState,
        error: false,
      });
      setPhotoState({
        ...photoState,
        error: false,
      });
    }
  }, [collectionState, photoState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="p-3">
      <Row style={{ marginBottom: "56px" }}>
        <Col>
          <AppNavBar />
        </Col>
      </Row>
      <Router />
      <Toaster position="bottom-center" />
    </Container>
  );
};

export default Page;
