import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header";
import renderer from "react-test-renderer"

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
});