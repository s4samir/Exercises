/*
 * Authored by Samir Kishore
 */
import React from "react";
import { create } from "react-test-renderer";
import TopForm, { level } from "./TopForm";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";

describe("TopForm", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const props = {
    onLevelChange: jest.fn(),
  };

  it("snapshot matching", () => {
    const wrapper = create(<TopForm {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("calls for Beginner level", () => {
    ReactTestUtils.act(() => {
      ReactDOM.render(<TopForm {...props} />, container);
    });
    const button = container.querySelectorAll("button");
    ReactTestUtils.act(() => {
      button[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(props.onLevelChange).toHaveBeenCalledWith(level.Beginner);
  });
  it("calls for Intermediate level", () => {
    ReactTestUtils.act(() => {
      ReactDOM.render(<TopForm {...props} />, container);
    });
    const button = container.querySelectorAll("button");

    ReactTestUtils.act(() => {
      button[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(props.onLevelChange).toHaveBeenCalledWith(level.Intermediate);
  });

  it("calls for Advanced level", () => {
    ReactTestUtils.act(() => {
      ReactDOM.render(<TopForm {...props} />, container);
    });
    const button = container.querySelectorAll("button");

    ReactTestUtils.act(() => {
      button[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(props.onLevelChange).toHaveBeenCalledWith(level.Advanced);
  });
});
