import React, { useState } from "react";
import Main from "../Components/Main/Main";
import RequestContext from "../Components/Contexts/RequestContext";

function Game({ changeResult }) {
  let noOfOptions = 4;

  let optionsList = (range) => {
    let result = [];

    for (let i = 0; i < range; i++) {
      result.push(i);
    }
    return result;
  };

  //Maintian selection of the option for expedition.
  const [requestBody, changeRequestBody] = useState({
    token: "",
    planet_names: optionsList(noOfOptions).map(() => null),
    vehicle_names: optionsList(noOfOptions).map(() => null)
  });

  //Maintian the list of planets and vehices.
  const [planets, changePlanets] = useState([]);
  const [vehicles, changeVehicles] = useState([]);

  //Maintian total time required for trip.
  const [totalTime, changeTotalTime] = useState(0);

  //To handle the find of falcone through POST request to fecth resule of expedition.
  function findFalcone() {
    changeResult(null);
    fetch("https://findfalcone.herokuapp.com/token", {
      method: "post",
      headers: {
        Accept: "application/json"
      }
    })
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          changeRequestBody((prev) => {
            prev.token = data.token;
            return prev;
          });
          fetch("https://findfalcone.herokuapp.com/find", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
          })
            .then(function (response) {
              if (response.status !== 200) {
                console.log(
                  "Looks like there was a problem. Status Code: " +
                    response.status
                );
                return;
              }

              // Examine the text in the response
              response.json().then(function (data) {
                changeResult(data);
              });
            })
            .catch(function (error) {
              console.log("Request failed", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  return (
    <React.Fragment>
      <RequestContext.Provider
        value={{
          requestBody,
          changeRequestBody,
          planets,
          changePlanets,
          vehicles,
          changeVehicles,
          totalTime,
          changeTotalTime,
          findFalcone
        }}
      >
        <Main options={optionsList(noOfOptions)} />
      </RequestContext.Provider>
    </React.Fragment>
  );
}

export default Game;
