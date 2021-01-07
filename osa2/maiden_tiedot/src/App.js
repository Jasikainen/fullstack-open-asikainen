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
  return (
    <div>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <div>
        <Country countries={countries} filterName={filterName} />
      </div>
    </div>
  );
};

export default App;
