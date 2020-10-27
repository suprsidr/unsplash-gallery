import '@testing-library/jest-dom/extend-expect';
import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import Provider, { AppContext, initialState } from '../Provider';

const TestApp = () => {
  const { state } = useContext(AppContext);

  return <h3>{state.perPage}</h3>;
};

describe('The Provider component', () => {
  test('should render children providing state', () => {
    const { container } = render(
      <Provider>
        <TestApp />
      </Provider>
    );
    expect(container.querySelector('h3')).toHaveTextContent(
      initialState.perPage
    );
  });
});