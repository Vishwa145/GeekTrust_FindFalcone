import React from "react";
import ReactDOM from "react-dom";
import Vehicle from "../Vehicle";
import RequestContext from "../../../Contexts/RequestContext";

//Mock data for testing.
const contextContent = {vehicles: [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},
{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},
{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},
{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}]};
let id = "vehicle";
let selectVehicle = jest.fn();

it("render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RequestContext.Provider value={contextContent}><Vehicle id={id} selectVehicle={selectVehicle}/></RequestContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});