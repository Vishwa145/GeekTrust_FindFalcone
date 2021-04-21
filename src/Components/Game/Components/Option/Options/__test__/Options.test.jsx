import React from "react";
import ReactDOM from "react-dom";
import Options from "../Options";
import RequestContext from "../../../Contexts/RequestContext";

//Mock data for testing.
const contextContent = {changeRequestBody:jest.fn(),
    planets: [],
    changePlanets:jest.fn(),
    vehicles: [],
    changeVehicles:jest.fn(),
    changeTotalTime:jest.fn()};
let index = 0;
let displayWarning = jest.fn();

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestContext.Provider value={contextContent}><Options index={index} displayWarning={displayWarning}/></RequestContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
