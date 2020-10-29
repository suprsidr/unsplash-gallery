import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, act } from '@testing-library/react';
import { navigate } from 'hookrouter';
import Router from '../Router';
import Provider from '../Provider';

import { setupIntersectionObserverMock } from '../../mocks/mock-intersection-observer';

beforeEach(() => setupIntersectionObserverMock());

describe('The Router component', () => {
  test('should display different components based on route', () => {
    const { getByText } = render(
      <Provider>
        <Router />
      </Provider>
    );

    act(() => {
      navigate('/');
    });
    const h1Element = getByText(/welcome/i);
    expect(h1Element).toBeInTheDocument();

    act(() => {
      navigate('/dogs');
    });
    const catLinkElement = getByText(/cats/i);
    expect(catLinkElement).toBeInTheDocument();

    act(() => {
      navigate('/cats');
    });
    const dogLinkElement = getByText(/dogs/i);
    expect(dogLinkElement).toBeInTheDocument();

    act(() => {
      navigate('/foo');
    });
    const oopsElement = getByText(/oops/i);
    expect(oopsElement).toBeInTheDocument();
  });
});