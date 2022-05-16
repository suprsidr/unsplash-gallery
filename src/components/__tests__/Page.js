import "@testing-library/jest-dom/extend-expect";
import { act, render } from "@testing-library/react";
import { navigate } from "raviger";
import React from "react";
import { setupIntersectionObserverMock } from "../../mocks/mock-intersection-observer";
import Page from "../Page";
import Provider from "../Provider";


beforeEach(() => setupIntersectionObserverMock());

describe("The Page component", () => {
  test("should display different components based on route as it simply wraps the router", () => {
    const { getByText } = render(
      <Provider>
        <Page />
      </Provider>
    );

    act(() => {
      navigate("/");
    });
    const h1Element = getByText(/welcome/i);
    expect(h1Element).toBeInTheDocument();

    act(() => {
      navigate("/dogs");
    });
    const catLinkElement = getByText(/cats/i);
    expect(catLinkElement).toBeInTheDocument();

    act(() => {
      navigate("/cats");
    });
    const dogLinkElement = getByText(/dogs/i);
    expect(dogLinkElement).toBeInTheDocument();
  });
});
