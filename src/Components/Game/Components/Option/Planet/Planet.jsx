import React, { useContext } from "react";
import RequestContext from "../../Contexts/RequestContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

function Planet({ id, selectPlanet }) {
  const { planets } = useContext(RequestContext);

  return (
    <Autocomplete
      id={"planet" + id}
      data-testid={"planet"}
      options={planets.map((planet) => planet.name)}
      getOptionLabel={(planet) => planet}
      style={{ width: 190, color: "red" }}
      getOptionSelected={(option, value) => option.name === value.name}
      onChange={selectPlanet}
      renderInput={(params) => (
        <TextField {...params} label="Select the Planet" variant="outlined" />
      )}
    />
  );
}

export default Planet;
