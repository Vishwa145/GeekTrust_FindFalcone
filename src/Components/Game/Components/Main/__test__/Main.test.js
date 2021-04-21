import React from "react";
import ReactDOM from "react-dom";
import Main from "../Main";
import { BrowserRouter as Router } from "react-router-dom";
import RequestContext from "../../Contexts/RequestContext";

//Mock data for testing.
const contextContent = {requestBody:{
    token: "",
    planet_names: [],
    vehicle_names: []},
    changePlanets:jest.fn(),
    changeVehicles:jest.fn(),
    totalTime:0,
    findFalcone:jest.fn()};
let options = [0, 1, 2, 3];


it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestContext.Provider value={contextContent}><Router><Main options={options}/></Router></RequestContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
