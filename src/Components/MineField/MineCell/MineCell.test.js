/*
 * Authored by Samir Kishore
 */
import React from "react";
import { create } from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import MineCell from "./MineCell";

describe("Mincell", () => {
  it("is rendered without mine class", () => {
    const props = {
      number: "11",
      isMine: false,
      onClick: () => {},
    };

    const wrapper = create(<MineCell {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;
    expect(instance.findByType("button").props.className).toBe("minecell 11");
  });

  it("is rendered with mine class", () => {
    const props = {
      number: "11",
      isMine: true,
      onClick: () => {},
    };

    const wrapper = create(<MineCell {...props} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
    const instance = wrapper.root;
    expect(instance.findByType("button").props.className).toBe(
      "minecell 11 blast"
    );
  });

  it("updates its cell value on click", () => {
    let container = document.createElement("div");
    document.body.appendChild(container);
    const props = {
      number: "11",
      isMine: true,
      onClick: () => 1,
    };
    ReactTestUtils.act(() => {
      ReactDOM.render(<MineCell {...props} />, container);
    });
    const button = container.querySelector("button");
    ReactTestUtils.act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button.textContent).toBe("1");

    document.body.removeChild(container);
    container = null;
  });
});
