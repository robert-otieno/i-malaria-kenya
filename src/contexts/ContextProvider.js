import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData } from "./utilities/functions";

import { fetchWeatherData } from "./utilities/read_weather_data_from_firebase";
import { predictiveModelInference } from "./utilities/predictive_model_inference";
import { getAlertState } from "./utilities/get_alert_state";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountriesData().then((data) => setCountriesData(data));
  }, []);

  // Function to predict malaria_incidence
  const predictMalariaIncidence = async (location) => {
    // Fetch weather data
    setLoading(true);
    const weatherData = await fetchWeatherData();

    // Make prediction
    const prediction = await predictiveModelInference(weatherData[0], weatherData[1], weatherData[2]); // relative_humidity, temperature, precipitation

    // Generate alert
    const alertLevel = getAlertState(prediction, location);
    setLoading(false);
    setAlertLevel(alertLevel);
  };

  return <StateContext.Provider value={{ loading, alertLevel, predictMalariaIncidence, countriesData, countryId, setCountryId }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
