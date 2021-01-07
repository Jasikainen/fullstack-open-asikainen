import React from "react";

const CountryFound = ({ countries }) => {
  const foundCountry = countries[0];

  return (
    <div>
      <h2>{foundCountry.name}</h2>
      <p>Capital city: {foundCountry.capital}</p>
      <p>Population: {foundCountry.population}</p>

      <h3>Languages spoken:</h3>
      <ul>
        {foundCountry.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>

      <img
        style={{
          height: 100,
          borderRadius: 15,
          border: "solid",
          borderWidth: 1,
        }}
        src={foundCountry.flag}
        alt="asd"
      />
    </div>
  );
};

export default CountryFound;
