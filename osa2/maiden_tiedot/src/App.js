import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");
  // 250 countries
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  // Get the country name for filtering from button clicked
  const handleClickShow = (event) => {
    const countryShow = event.target.attributes.countryAttribute;
    setFilterName(countryShow.value);
  };
  // Reset filter
  const handleClickReset = (event) => {
    setFilterName("");
  };

  return (
    <div>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <div>
        <Country
          countries={countries}
          filterName={filterName}
          handleClickShow={handleClickShow}
          handleClickReset={handleClickReset}
        />
      </div>
    </div>
  );
};

export default App;
