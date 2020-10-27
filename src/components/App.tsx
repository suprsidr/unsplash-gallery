import React from 'react';
import Provider from './Provider';
import Page from './Page';
// Importing Sass with Bootstrap CSS
import './App.scss';

const App: React.FC = () => {
  return (
    <Provider>
      <Page />
    </Provider>
  );
};

export default App;
