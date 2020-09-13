/*
 * Authored by Samir Kishore
 */
import React from "react";
import App from "./App";
import { create } from "react-test-renderer";

test("renders learn react link", () => {
  const wrapper = create(<App />);
  expect(wrapper.toJSON()).toMatchSnapshot();
});
