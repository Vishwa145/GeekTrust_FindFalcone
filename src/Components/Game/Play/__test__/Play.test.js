import React from "react";
import ReactDOM from "react-dom";
import Play from "../Play";
import renderer from "react-test-renderer"

const changeResult=jest.fn();

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Play changeResult={changeResult}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Play changeResult={changeResult}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
