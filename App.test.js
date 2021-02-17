import React from "react";
import { act, render } from "@testing-library/react-native";

import App from "./App";
import { getData } from "./api";

jest.mock("./api", () => ({
  getData: jest.fn(async () => []),
}));

it("renders loading with no data", async () => {
  const { getByText } = render(<App />);

  // Test initial state
  getByText("Loading...");

  await act(() => new Promise((resolve) => setImmediate(resolve)));

  // Test what it will look like AFTER state has been updated
  getByText("Loading...");
});

it("renders list of our data", async () => {
  getData.mockResolvedValueOnce([{ text: "test 1" }, { text: "test 2" }]);

  const { getByText, queryByText, getByTestId } = render(<App />);

  // Test initial state
  getByText("Loading...");

  await act(() => new Promise((resolve) => setImmediate(resolve)));

  // Test what it will look like AFTER state has been updated
  expect(queryByText("Loading...")).toBeNull();
  getByTestId("FlatList");
  getByText("test 1");
  getByText("test 2");
});
