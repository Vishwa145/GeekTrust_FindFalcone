import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import RequestContext from "../Contexts/RequestContext";
import { resultURL } from "../../../URLs";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Alert, AlertTitle } from "@material-ui/lab";

const Options = lazy(() => import("../Option/Options/Options"));

function Main({ options }) {
  //Maintian display of warning.
  var [warning, warn] = useState("none");

  const {
    requestBody,
    changePlanets,
    changeVehicles,
    totalTime,
    findFalcone
  } = useContext(RequestContext);

  //TO load all the required data of of expedition.
  useEffect(() => {
    fetch("https://findfalcone.herokuapp.com/planets")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          changePlanets(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

    fetch("https://findfalcone.herokuapp.com/vehicles")
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        response.json().then(function (data) {
          changeVehicles(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }, []);

  //To Display warning for short term of time and vanish.
  function displayWarning() {
    warn("block");
    setTimeout(() => {
      warn("none");
    }, 10000);
  }

  return (
    <form className="form">
      {options.map((index) => {
        return (
          <Suspense key={index} fallback={<div>Loading...</div>}>
            <Options index={index} displayWarning={displayWarning} />
          </Suspense>
        );
      })}
      <h2>Time taken: {totalTime}</h2>
      <div className="btn">
        {requestBody.planet_names.includes(null) ||
        requestBody.vehicle_names.includes(null) ? null : (
          <Link to={resultURL}>
            <Button
              variant="contained"
              color="default"
              onClick={findFalcone}
              endIcon={<SearchIcon />}
            >
              Find Falcone
            </Button>
          </Link>
        )}
        <Alert severity="info" className="warning" style={{ display: warning }}>
          <AlertTitle>Info</AlertTitle>No vehicles availalbe of this kind
          <strong> | </strong>Distance of planet exceeds maximum distance limit
          of vehicle
        </Alert>
      </div>
    </form>
  );
}

export default Main;
