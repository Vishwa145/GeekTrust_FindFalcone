import React, { useState, useContext } from "react";
import Planet from "../Planet/Planet";
import Vehicle from "../Vehicle/Vehicle";
import RequestContext from "../../Contexts/RequestContext";

function Options({ index, displayWarning }) {
  //Maintian individual selection of planet and vehicle.
  var [selectedPlanet, changePlanetSelection] = useState(null);
  var [selectedVehicle, changeVehicleSelection] = useState(null);

  //Maintian individaul time taken.
  var [timeTaken, changeTimeTaken] = useState(0);

  const {
    changeRequestBody,
    planets,
    changePlanets,
    vehicles,
    changeVehicles,
    changeTotalTime
  } = useContext(RequestContext);

  //Handle selection of planet.
  function selectPlanet(event) {
    //In case of clearing the planet selection,
    //remove from planet selection and Planet_names in requestbody,
    //deselect the radio button, remove vehicles display, and change the timeTaken, and totalTime.
    //Else if selecting the planet, add to planet selection and Planet_names in requestbody,
    //and display vehicle options.
    if (event.target.innerText === undefined) {
      changePlanets((prev) => [...prev, selectedPlanet]);
      changePlanetSelection(null);
      var radiolist = document.getElementsByClassName("vehicle" + index);
      for (let i = 0; i < radiolist.length; i++) {
        radiolist[i].checked = false;
      }
      changeVehicles((prev) => {
        return prev.map((vehicle) => {
          if (
            selectedVehicle !== null &&
            selectedVehicle !== undefined &&
            selectedVehicle.name === vehicle.name
          ) {
            vehicle.total_no++;
            changeRequestBody((prev) => {
              prev.vehicle_names[index] = null;
              return prev;
            });
            changeVehicleSelection(null);
            changeTotalTime((prev) => {
              return prev - timeTaken;
            });
            changeTimeTaken(0);
          }
          return vehicle;
        });
      });
      changeRequestBody((prev) => {
        prev.planet_names[index] = null;
        return prev;
      });
    } else {
      planets.forEach((planet) => {
        if (planet.name === event.target.innerText) {
          changePlanets(
            planets.filter((item) => {
              return item.name !== event.target.innerText;
            })
          );
          changeRequestBody((prev) => {
            prev.planet_names[index] = planet.name;
            return prev;
          });
          changePlanetSelection(planet);
        }
      });
    }
  }

  //Handle selection of vehicle
  function selectVehicle(event) {
    //Check if valid and available vehicle is selected,
    //in which case add it to vehicle selection and vehicle_names of requestBody,
    //else Display a warning message.
    vehicles.forEach((vehicle) => {
      if (vehicle.name === event.target.value) {
        if (
          vehicle.total_no === 0 ||
          selectedPlanet === null ||
          selectedPlanet.distance > vehicle.max_distance
        ) {
          event.target.checked = false;
          displayWarning();
          return;
        }
        changeVehicles((prev) => {
          return prev.map((veh) => {
            if (event.target.value === veh.name) {
              veh.total_no--;
            } else if (
              selectedVehicle !== null &&
              selectedVehicle !== undefined &&
              selectedVehicle.name === veh.name
            ) {
              veh.total_no++;
            }
            return veh;
          });
        });
        changeRequestBody((prev) => {
          prev.vehicle_names[index] = vehicle.name;
          return prev;
        });
        changeVehicleSelection(vehicle);
        var time = selectedPlanet.distance / vehicle.speed;
        changeTotalTime((prev) => {
          return prev - timeTaken + time;
        });
        changeTimeTaken(selectedPlanet.distance / vehicle.speed);
      }
    });
  }

  return (
    <div>
      <Planet id={"planet" + index} selectPlanet={selectPlanet} />
      {selectedPlanet !== null ? (
        <Vehicle id={"vehicle" + index} selectVehicle={selectVehicle} />
      ) : null}
    </div>
  );
}

export default Options;
