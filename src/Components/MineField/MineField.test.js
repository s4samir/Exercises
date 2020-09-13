/*
 * Authored by Samir Kishore
 */
import React from "react";
import { create } from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import MineField from "./MineField";

describe("Minefield", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("creates minecell", () => {
    const props = {
      row: 5,
      col: 5,
      mineMap: new Set(),
      startTimer: () => {},
      closeGame: () => {},
    };
    const wrapper = create(<MineField {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;
    expect(instance.findAllByType("button").length).toBe(25);
  });

  it("triggers game over on mine click", () => {
    let mySet = new Set();
    mySet.add("11");
    mySet.add("22");

    const props = {
      row: 3,
      col: 3,
      mineMap: mySet,
      startTimer: jest.fn(() => {}),
      closeGame: jest.fn(() => {}),
    };
    ReactTestUtils.act(() => {
      ReactDOM.render(<MineField {...props} />, container);
    });
    const buttons = container.querySelectorAll("button");

    ReactTestUtils.act(() => {
      buttons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(props.closeGame).toHaveBeenCalledWith("over");
    expect(props.startTimer).toHaveBeenCalledWith(false);
  });

  it("triggers game won on all correct click", () => {
    let mySet = new Set();
    mySet.add("11");
    mySet.add("22");

    const props = {
      row: 2,
      col: 2,
      mineMap: mySet,
      startTimer: jest.fn(() => {}),
      closeGame: jest.fn(() => {}),
    };
    ReactTestUtils.act(() => {
      ReactDOM.render(<MineField {...props} />, container);
    });
    const buttons = container.querySelectorAll("button");

    ReactTestUtils.act(() => {
      buttons[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
      buttons[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(props.closeGame).toHaveBeenCalledWith("won");
    expect(props.startTimer).toHaveBeenCalledWith(true);
  });
});
