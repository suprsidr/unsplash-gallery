import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import Provider, { initialState, initialPhotoState } from "../Provider";
import { useRecoilValue } from "recoil";

const TestApp = () => {
  const state = useRecoilValue(initialState);

  return <h3>{state.perPage}</h3>;
};

describe("The Provider component", () => {
  test("should render children providing state", () => {
    const { container } = render(
      <Provider>
        <TestApp />
      </Provider>
    );
    expect(container.querySelector("h3")).toHaveTextContent(
      initialPhotoState.perPage
    );
  });
});
