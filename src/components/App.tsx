import React from 'react';
import Provider from './Provider';
import Page from './Page';

const App: React.FC = () => {
  return (
    <Provider>
      <Page />
    </Provider>
  );
};

export default App;
