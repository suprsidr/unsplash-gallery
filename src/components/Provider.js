import propTypes from "prop-types";
import React from "react";
import { atom, RecoilRoot } from "recoil";

export const initialPhotoState = {
  photoItems: [],
  page: 1,
  perPage: 30,
  error: false,
  endOfData: false,
  showToastMessage: false
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
  showToastMessage: false
};

export const collectionListState = atom({
  key: "collectionListState",
  default: {
    ...initialCollectionListState,
  },
});

export const themeState = atom({
  key: 'themeState',
  default: localStorage.getItem("savedTheme") || "light"
});

const Provider = ({ children }) => <RecoilRoot>{children}</RecoilRoot>;

Provider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
};

export default Provider;
