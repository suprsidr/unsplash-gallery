import React from 'react';
import propTypes from 'prop-types';
import {
  RecoilRoot,
  atom
} from 'recoil';

export const initialState = atom({
  key: 'initialState',
  default: {
    photoItems: [],
    page: 1,
    perPage: 30,
    endOfData: false
  }
});

export const collectionListState = atom({
  key: 'collectionListState',
  default: {
    collectionListItems: [],
    page: 1,
    perPage: 10,
    error: false,
    endOfData: false
  }
});

const Provider = ({ children }) => (
  <RecoilRoot>
    {children}
  </RecoilRoot>);

Provider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ])
};

export default Provider;
