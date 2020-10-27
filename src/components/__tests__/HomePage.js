import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../HomePage';
import Provider from '../Provider';

describe('The HomePage component', () => {
  test('should render h1, h2 and the animal links', () => {
    const { getByText, getByAltText } = render(
      <Provider>
        <HomePage />
      </Provider>
    );

    const h1Element = getByText(/welcome/i);
    expect(h1Element).toBeInTheDocument();
    const h2Element = getByText(/make/i);
    expect(h2Element).toBeInTheDocument();
    const catElement = getByAltText(/cat/i);
    expect(catElement).toBeInTheDocument();
    const dogElement = getByAltText(/dog/i);
    expect(dogElement).toBeInTheDocument();
  });
});