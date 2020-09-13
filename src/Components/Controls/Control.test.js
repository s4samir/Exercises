/*
 * Authored by Samir Kishore
 */
import React from "react";
import { create } from "react-test-renderer";
import Controls from "./Controls";

describe("Controls", () => {
  it("creates a snapshot of Control", () => {
    const props = {
      startTheTimer: false,
      onNewGame: () => {},
    };
    const wrapper = create(<Controls {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
