import React from 'react';
import propTypes from 'prop-types';
import {
  RecoilRoot,
  atom
} from 'recoil';

export const initialState = atom({
  key: 'initialState',
  default: {
    collectionListItems: [],
    collectionListPage: 1,
    photoItems: [],
    page: 1,
    perPage: 30,
    query: '',
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
