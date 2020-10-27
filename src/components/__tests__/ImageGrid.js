import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ImageGrid from '../ImageGrid';
import Provider from '../Provider';

import { setupIntersectionObserverMock } from '../../mocks/mock-intersection-observer';

beforeEach(() => setupIntersectionObserverMock());

describe('The ImageGrid component', () => {
  test('should display dog link in nav bar', () => {
    const { getByText } = render(
      <Provider>
        <ImageGrid query="cats" />
      </Provider>
    );

    const dogLinkElement = getByText(/dogs/i);
    expect(dogLinkElement).toBeInTheDocument();
  });

  test('should display cat link in nav bar', () => {
    const { getByText } = render(
      <Provider>
        <ImageGrid query="dogs" />
      </Provider>
    );

    const catLinkElement = getByText(/cats/i);
    expect(catLinkElement).toBeInTheDocument();
  });

  test('should display image from state in grid', async () => {
    const initialState = {
      photoItems: [
        {
          id: 12345,
          description: 'Image description',
          altDescription: 'Other description',
          urls: {
            small: 'image-data',
            full: 'full-image-data'
          },
          links: {
            download: 'https://some-url'
          },
          likes: 5,
          user: {
            first_name: 'Lily',
            last_name: 'Patterson'
          }
        }
      ],
      page: 1,
      perPage: 30
    };

    const { getByText, getByAltText, getByTestId, getByRole } = render(
      <Provider appState={initialState}>
        <ImageGrid query="cats" />
      </Provider>
    );

    const imageElement = getByAltText('Image description');
    expect(imageElement).toBeInTheDocument();

    const link = getByTestId('12345');
    fireEvent.click(link);

    await waitFor(() => getByRole('dialog'));

    const byLineElement = getByText(/lily/i);
    expect(byLineElement).toBeInTheDocument();
  });
});