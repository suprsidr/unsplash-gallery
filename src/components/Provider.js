import React from "react";
import propTypes from "prop-types";
import { RecoilRoot, atom } from "recoil";

export const initialPhotoState = {
  photoItems: [],
  page: 1,
  perPage: 30,
  endOfData: false,
};

export const initialState = atom({
  key: "initialState",
  default: {
    ...initialPhotoState,
  },
});

export const initialCollectionListState = {
  collectionListItems: [],
  page: 1,
  perPage: 10,
  error: false,
  endOfData: false,
};

export const collectionListState = atom({
  key: "collectionListState",
  default: {
    ...initialCollectionListState,
  },
});

const Provider = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;

Provider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
};

export default Provider;
