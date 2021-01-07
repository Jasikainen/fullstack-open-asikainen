import React from "react";
import CountryFound from "./CountryFound";

const Country = ({ countries, filterName }) => {
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
    return <CountryFound countries={filteredCountries} />;
  }
  // <= 10 countries found
  return filteredCountries.map((country) => (
    <p key={country.name}> {country.name} </p>
  ));
};

export default Country;
