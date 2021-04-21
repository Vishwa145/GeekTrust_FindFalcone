import React, { useContext } from "react";
import RequestContext from "../../Contexts/RequestContext";

function Vehicle({ selectVehicle, id }) {
  const { vehicles } = useContext(RequestContext);

  return (
    <>
      {vehicles.map((vehicle, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              onChange={selectVehicle}
              name={"vehicle" + id}
              value={vehicle.name}
            />
            <label forhtml={vehicle.name} className="radiolabel">
              {vehicle.name} ({vehicle.total_no})
            </label>
            <br />
          </div>
        );
      })}
    </>
  );
}

export default Vehicle;
