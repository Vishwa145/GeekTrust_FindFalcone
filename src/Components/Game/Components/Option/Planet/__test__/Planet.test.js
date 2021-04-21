import React from "react";
import ReactDOM from "react-dom";
import Planet from "../Planet";
import RequestContext from "../../../Contexts/RequestContext";

//Mock data for testing.
const contextContent = {planets: [{"name":"Donlon","distance":100},
{"name":"Enchai","distance":200},
{"name":"Jebing","distance":300},
{"name":"Sapir","distance":400},
{"name":"Lerbin","distance":500},
{"name":"Pingasor","distance":600}]};
let id = "planet";
let selectPlanet = jest.fn();

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestContext.Provider value={contextContent}><Planet id={id} selectPlanet={selectPlanet}/></RequestContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
