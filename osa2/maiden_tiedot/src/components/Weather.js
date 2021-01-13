import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const Weather = ({ capitalCity }) => {
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: process.env.REACT_APP_API_KEY,
          query: capitalCity,
        },
      })
      .then((response) => {
        console.log("response", response);
        setWeather(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [capitalCity]);

  return (
    <div>
      {weather !== undefined && (
        <Fragment>
          <h2>Weather in {capitalCity}</h2>
          <p>temperature: {weather.current.temperature}</p>
          <img
          style={{
            height: 75,
            borderRadius: 5,
            border: "solid",
            borderWidth: 1,
          }}
          src={weather.current.weather_icons}
          alt={`Weather is ${weather.current.weather_descriptions}`}
        />
        <p>wind:
        {" "}
        {weather.current.wind_speed}
        {" mph "}
        {weather.current.wind_dir}
        </p>
        </Fragment>
        
      )}
    </div>
  );
};

export default Weather;

/*
const getWeather = async () => {
    const params = {
      access_key: apiKey,
      query: capitalCity,
    };
    let response = await axios.get("http://api.weatherstack.com/current", {
      params,
    });
    console.log(response.data);
    setWeather(response.data);
  };

  useEffect(() => {
    getWeather();
  }, []);  
<p>Temperature: {weather.current.temperature}</p>
  
*/
