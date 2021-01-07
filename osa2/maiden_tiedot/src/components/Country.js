import React from "react";
import CountryFound from "./CountryFound";

const Country = ({
  countries,
  filterName,
  handleClickShow,
  handleClickReset,
}) => {
  var filteredCountries = countries;

  // Filter out the country names
  if (filterName) {
    filteredCountries = filteredCountries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(filterName.toLowerCase()) >= 0
    );
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  // Exactly one country found
  else if (filteredCountries.length === 1) {
    return (
      <CountryFound
        countries={filteredCountries}
        handleClickReset={handleClickReset}
      />
    );
  }
  // <= 10 countries found
  return filteredCountries.map((country) => (
    <p key={country.name}>
      {" "}
      {country.name}{" "}
      <button onClick={handleClickShow} countryAttribute={country.name}>
        show
      </button>
    </p>
  ));
};

export default Country;
