import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../NotFound';

describe('The NotFound component', () => {
  test('should display not found message', () => {
    const { getByText } = render(
      <NotFound />
    );
    const h2Element = getByText(/oops/i);
    expect(h2Element).toBeInTheDocument();
  });
});