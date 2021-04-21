import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Result from "../Result";
import {cleanup} from "@testing-library/react"
import renderer from "react-test-renderer"

const result1=null;
const result2=undefined;
const result3={planet_name:"Enchai" ,status:"success"};
const result4={status:false};

afterEach(cleanup);

it("1.render successfully", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Result result={result1}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("2.render successfully", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Result result={result2}/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("3.render successfully", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Result result={result3}/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("4.render successfully", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Result result={result4}/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Router><Result result={result1}/></Router>).toJSON();
    expect(tree).toMatchSnapshot("1");
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Router><Result result={result1}/></Router>).toJSON();
    expect(tree).toMatchSnapshot("2");
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Router><Result result={result1}/></Router>).toJSON();
    expect(tree).toMatchSnapshot("3");
});

it("Matches snapshot", ()=>{
    const tree = renderer.create(<Router><Result result={result1}/></Router>).toJSON();
    expect(tree).toMatchSnapshot("4");
});