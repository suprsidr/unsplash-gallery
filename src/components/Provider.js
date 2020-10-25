import React, { useState } from 'react';
import propTypes from 'prop-types';
import { getCollection } from '../services/lambda-service';

export const AppContext = React.createContext();

export const initialState = {
  photoItems: [],
  page: 0,
  perPage: 50
};

const Provider = ({ children, appState = initialState }) => {
  const [state, setState] = useState(appState);

  /*
   * the setState we get from the hook does not do the shallow merge.
   */
  const updateState = newState => {
    setState({
      ...state,
      ...newState
    });
  };

  const fetchMore = async ({ page, perPage, query }) => {
    let results = [];
    const json = await getCollection({ page, perPage, query });
    if(json.results) {
      results = json.results.map(({ id, created_at: created, description, alt_description: altDescription, urls, links, likes, user }) =>
        ({id, created, description, altDescription, urls, links, likes, user}));
    }
    updateState({ page, photoItems: [ ...state.photoItems, ...results ] });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState: updateState,
        fetchMore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  appState: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ])
};

export default Provider;
