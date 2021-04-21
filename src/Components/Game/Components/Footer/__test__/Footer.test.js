import React from "react";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import renderer from "react-test-renderer"

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
