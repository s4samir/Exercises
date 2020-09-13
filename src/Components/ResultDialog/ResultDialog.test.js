/*
 * Authored by Samir Kishore
 */
import React from "react";
import ResultDialog from "./ResultDialog";
import { createMount } from "@material-ui/core/test-utils";

describe("ResultDialog", () => {
  it("snapshot matching", () => {
    const props = {
      result: "win",
      onClose: () => {},
    };
    const wrapper = createMount()(<ResultDialog {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
