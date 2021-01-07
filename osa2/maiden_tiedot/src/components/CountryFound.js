import React from "react";

const CountryFound = ({ countries, handleClickReset }) => {
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
      <div>
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
      <button onClick={handleClickReset}>Back to search</button>
    </div>
  );
};

export default CountryFound;
