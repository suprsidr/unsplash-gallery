import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { RecoilRoot } from "recoil";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PhotoGrid from "../PhotoGrid";
import PhotoSearchData from "../PhotoSearchData";
import Provider, { initialState } from "../Provider";

import { setupIntersectionObserverMock } from "../../mocks/mock-intersection-observer";

const initialPhotoState = {
  photoItems: [
    {
      id: 12345,
      description: "Image description",
      altDescription: "Other description",
      urls: {
        small: "image-data",
        full: "full-image-data",
      },
      links: {
        download: "https://some-url",
      },
      likes: 5,
      user: {
        first_name: "Lily",
        last_name: "Patterson",
      },
    },
  ],
  page: 1,
  perPage: 30,
  endOfData: false,
};

beforeEach(() => setupIntersectionObserverMock());

describe("The PhotoGrid component", () => {
  test("should display dog link in nav bar", () => {
    const { getByText } = render(
      <Provider>
        <PhotoSearchData query="cats">
          <PhotoGrid />
        </PhotoSearchData>
      </Provider>
    );

    const dogLinkElement = getByText(/dogs/i);
    expect(dogLinkElement).toBeInTheDocument();
  });

  test("should display cat link in nav bar", () => {
    const { getByText } = render(
      <Provider>
        <PhotoSearchData query="dogs">
          <PhotoGrid />
        </PhotoSearchData>
      </Provider>
    );

    const catLinkElement = getByText(/cats/i);
    expect(catLinkElement).toBeInTheDocument();
  });

  test("should display image from state in grid", async () => {
    let scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByText, getByAltText, getByTestId, getByRole } = render(
      <RecoilRoot
        initializeState={(snap) =>
          snap.set(initialState, { ...initialPhotoState })
        }
      >
        <PhotoGrid />
      </RecoilRoot>
    );

    const imageElement = getByAltText("Image description");
    expect(imageElement).toBeInTheDocument();

    const link = getByTestId("12345");
    fireEvent.click(link);

    await waitFor(() => getByRole("dialog"));

    const byLineElement = getByText(/lily/i);
    expect(byLineElement).toBeInTheDocument();
  });
});
