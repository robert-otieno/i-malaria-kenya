import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { DateTime } from "luxon";
import { db } from "../firebase";
import { getCountriesData } from "./utilities/functions";
// import { fetchWeatherData } from "./utilities/read_weather_data_from_firebase";
import { predictiveModelInference } from "./utilities/predictive_model_inference";
import { getAlertState } from "./utilities/get_alert_state";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  // read weather data from firebase
  const fetchWeatherData = async () => {
    const now = DateTime.now();
    const weatherData = [];

    const q = query(collection(db, "weatherData"), where("timePeriod", "==", `${now.month}_${now.year}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      weatherData.push(doc.data());
    });

    const relative_humidity = calculateAverage(weatherData, "humidity");
    const temperature = calculateAverage(weatherData, "temperature");
    const precipitation = calculateAverage(weatherData, "precipitation");

    const avgWeatherData = [relative_humidity, temperature, precipitation];
    return avgWeatherData;
  };

  const calculateAverage = (data, property) => {
    const sum = data.reduce((accumulator, item) => {
      return accumulator + item[property];
    }, 0);

    const average = sum / data.length;
    return average;
  };

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
