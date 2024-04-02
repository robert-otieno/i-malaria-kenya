import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Data
import malariaData from "../assets/structured_malaria_data.json";
import countiesData from "../assets/counties.json";

const StateContext = createContext();

// const tf = window.tf;
// const tfdf = window.tfdf;

// // Malaria incidence prediction
// const predictiveModelInference = async (weatherData) => {
//   // Load the model
//   const model = await tfdf.loadTFDFModel("http://127.0.0.1:3000/tfdf_model/model.json");

//   // Perform an inference
//   const result = await model.executeAsync({
//     precipitation: tf.tensor([weatherData[2]]),
//     relative_humidity: tf.tensor([weatherData[1]]),
//     temperature: tf.tensor([weatherData[0]]),
//   });

//   return result.dataSync()[1];
// };

// /**
//  * Baseline Data
//  * Collect historical data on malaria incidence
//  * Get the average historical incidence of malaria cases seen in the previous 3 weeks
//  * Normal Threshold: average historical incidence of malaria cases seen in the previous 3 weeks (baseline)
//  * Warning Threshold: the number of malaria cases exceeds the normal threshold but has not reached the alert threshold
//  * Alert/Epidemic Threshold: 1.5 * baseline level (indicates a critical situation)
//  */

// function calculateMalariaThresholds(historicalData, currentIncidence) {
//   // Calculate the average historical incidence for the last 3 weeks
//   historicalData = [12.323, 10.601, 6.653, 5.059, 8.528, 10.171, 13.362, 9.727, 7.78, 8.62, 5.446, 4.63, 6.626, 5.102, 7.312, 5.716, 6.081];
//   const recentData = historicalData.slice(-3); // Get last 3 elements
//   const averageIncidence = recentData.reduce((sum, value) => sum + value, 0) / recentData.length;

//   // Calculate thresholds based on average
//   const normalThreshold = averageIncidence;
//   const warningThreshold = currentIncidence > averageIncidence && currentIncidence < 1.5 * averageIncidence;
//   const alertThreshold = 1.5 * averageIncidence;

//   // Analyze current incidence
//   if (currentIncidence > alertThreshold) {
//     return `Epidemic alert! Current incidence (${Number(currentIncidence).toFixed(2)}) exceeds the alert threshold (${Number(alertThreshold).toFixed(2)}).`;
//   } else if (currentIncidence > warningThreshold) {
//     return `Early warning! Current incidence (${Number(currentIncidence).toFixed(2)}) exceeds the normal threshold (${Number(normalThreshold).toFixed(2)}).`;
//   } else {
//     return `No immediate concern. Current incidence (${Number(currentIncidence).toFixed(2)}) is within acceptable limits (normal threshold: ${Number(normalThreshold).toFixed(2)}).`;
//   }
// }

// GET Countries data
const getCountriesData = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const total_malaria_cases_per_year = () => {
  // Create a table to store the results
  const table = {};

  // Iterate over the data and calculate the total cases per county per year
  for (const county in malariaData) {
    table[county] = {};

    for (const year in malariaData[county]) {
      let totalCases = 0;

      for (const month in malariaData[county][year]) {
        totalCases += malariaData[county][year][month].confirmed_cases;
      }

      table[county][year] = totalCases;
    }
  }

  // Filter the last 5 years
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const filteredTable = {};

  for (const county in table) {
    filteredTable[county] = {};

    for (const year in table[county]) {
      if (lastFiveYears.includes(parseInt(year))) {
        filteredTable[county][year] = table[county][year];
      }
    }
  }

  // Print the table
  console.table(filteredTable);
};

const getTotalPopulation = (locationName) => {
  const location = countiesData.find((item) => item.name === locationName);
  if (location) {
    return location.population.total;
  } else {
    return null; // Location not found in the data array
  }
};

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [alertLevel, setAlertLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * getCountriesData useEffect
   */
  useEffect(() => {
    getCountriesData().then((data) => setCountriesData(data));
  }, []);

  // Extract country name and country code from countriesData
  const countries = countriesData.map((country) => {
    const countryData = {};

    countryData.name = country.name.common;
    countryData.code = country.cca3;

    return countryData;
  });

  // Sort Countries by name
  countries.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  const [selectedCounty, setSelectedCounty] = useState(null);

  return (
    <StateContext.Provider
      value={{
        selectedCounty,
        setSelectedCounty,
        // calculateMalariaThresholds,
        loading,
        alertLevel,
        countries,
        countryId,
        setCountryId,
        total_malaria_cases_per_year,
        getTotalPopulation,
        // predictiveModelInference,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
