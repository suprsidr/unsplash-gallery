import React, { useState } from 'react';
import propTypes from 'prop-types';

export const AppContext = React.createContext();

export const initialState = {
  collectionListItems: [],
  collectionListPage: 0,
  photoItems: [],
  page: 0,
  perPage: 30
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

  return (
    <AppContext.Provider
      value={{
        state,
        setState: updateState
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
