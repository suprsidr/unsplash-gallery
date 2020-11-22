import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import Provider from "../Provider";

describe("The App component", () => {
  test("should not crash", () => {
    const { getByText, getByAltText } = render(
      <Provider>
        <App />
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
