import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { DateTime } from "luxon";
import axios from "axios";

import { db } from "../firebase";

// Data
import malariaData from "../assets/structured_malaria_data.json";
import countiesData from "../assets/counties.json";
// import countriesData from "../assets/countriesData.json";

const StateContext = createContext();
const tf = window.tf;
const tfdf = window.tfdf;

// Malaria incidence prediction
const predictiveModelInference = async (weatherData) => {
  // Load the model
  const model = await tfdf.loadTFDFModel("http://127.0.0.1:3000/tfdf_model/model.json");

  // Perform an inference
  const result = await model.executeAsync({
    precipitation: tf.tensor([weatherData[2]]),
    relative_humidity: tf.tensor([weatherData[1]]),
    temperature: tf.tensor([weatherData[0]]),
  });

  return result.dataSync()[1];
};

// GET Countries data
const getCountriesData = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

// GET daily weather data
// const fetchWeatherData = async (location) => {
//   try {
//     const { data } = await axios.request({
//       method: "GET",
//       url: "https://weatherapi-com.p.rapidapi.com/current.json",
//       // params: { q: "Kenya" },
//       params: { q: `${location}` },
//       headers: {
//         "X-RapidAPI-Key": "98d5f6252dmsh6d86ab92df5d9d5p1dc650jsn0e282e3b3c32",
//         "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
//       },
//     });
//     const { last_updated, humidity, temp_c, precip_mm } = data.current;
//     const weatherData = [last_updated, temp_c, humidity, precip_mm];
//     return weatherData;
//   } catch (error) {
//     console.error("An error occurred while fetching weather data:", error);
//     throw error;
//   }
// };

// Send weather data to firebase
// const fetchAndSaveWeatherData = async () => {
//   try {
//     const weatherData = await fetchWeatherData("Nairobi");
//     // Send weather data to Firestore
//     const docRef = await addDoc(collection(db, "weatherData"), {
//       createdAt: weatherData[0],
//       humidity: weatherData[1],
//       temperature: weatherData[2],
//       precipitation: weatherData[3],
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (error) {
//     console.error("An error occurred while fetching and saving weather data:", error);
//     return null;
//   }
// };

// function to schedule fetching of weather data
// const scheduleWeatherData = async () => {
//   const currentDate = DateTime.local();
//   const nextMidnight = currentDate.plus({ days: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
//   const timeToNextMidnight = nextMidnight.diff(currentDate).as("milliseconds");

//   setTimeout(async () => {
//     const success = await fetchAndSaveWeatherData();
//     if (success) {
//       scheduleWeatherData();
//     }
//   }, timeToNextMidnight);
// };

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

// read weather data from firebase
// const fetchWeatherDataFromFirebase = async () => {
//   const now = DateTime.now();
//   const weatherData = [];

//   const q = query(collection(db, "weatherData"), where("timePeriod", "==", `${now.month}_${now.year}`));

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     weatherData.push(doc.data());
//   });

//   const relative_humidity = calculateAverage(weatherData, "humidity");
//   const temperature = calculateAverage(weatherData, "temperature");
//   const precipitation = calculateAverage(weatherData, "precipitation");

//   const avgWeatherData = [relative_humidity, temperature, precipitation];
//   return avgWeatherData;
// };

// Calculate alert state
// const calculateAlertThreshold = (locationName) => {
//   const locationData = malariaCases[locationName];

//   //   console.log(locationData);
//   const monthlyConfirmedCases = [];

//   // Step 1: Extract the data for all years and calculate total confirmed cases for each month
//   for (const year in locationData) {
//     for (const month in locationData[year]) {
//       const monthData = locationData[year][month];
//       const confirmedCases = monthData.confirmed_cases;
//       monthlyConfirmedCases.push(confirmedCases);
//     }
//   }

//   // Step 2: Sort the monthly confirmed cases in ascending order
//   monthlyConfirmedCases.sort((a, b) => a - b);

//   // Step 3: Calculate the index of the third quartile (Q3)
//   const n = monthlyConfirmedCases.length;

//   const q3Index = Math.ceil((3 * n) / 4);

//   // Step 4: Calculate the third quartile value
//   const alertThreshold = monthlyConfirmedCases[q3Index - 1];

//   return alertThreshold;
// };

// const calculateActionThreshold = (locationName) => {
//   const locationData = malariaCases[locationName];
//   const monthlyConfirmedCases = [];

//   // Step 1: Extract the data for all years and calculate total confirmed cases for each month
//   for (const year in locationData) {
//     for (const month in locationData[year]) {
//       const monthData = locationData[year][month];
//       const confirmedCases = monthData.confirmed_cases;
//       monthlyConfirmedCases.push(confirmedCases);
//     }
//   }

//   // Step 2: Calculate the mean (average) of the monthly confirmed cases
//   const sum = monthlyConfirmedCases.reduce((acc, val) => acc + val, 0);
//   const mean = sum / monthlyConfirmedCases.length;

//   // Step 3: Calculate the standard deviation of the monthly confirmed cases
//   const squaredDifferences = monthlyConfirmedCases.map((val) => (val - mean) ** 2);
//   const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / monthlyConfirmedCases.length;
//   const standardDeviation = Math.sqrt(variance);

//   // Step 4: Multiply the standard deviation by 1.5
//   const actionThresholdDeviation = standardDeviation * 1.5;

//   // Step 5: Add the result from step 4 to the mean to get the action threshold
//   const actionThreshold = mean + actionThresholdDeviation;

//   return actionThreshold;
// };

const getTotalPopulation = (locationName) => {
  const location = countiesData.find((item) => item.name === locationName);
  if (location) {
    return location.population.total;
  } else {
    return null; // Location not found in the data array
  }
};

// const getAlertState = (malariaIncidence, location) => {
//   const actionThreshold = calculateActionThreshold(location);
//   const alertThreshold = calculateAlertThreshold(location);
//   const populationAtRisk = getTotalPopulation(location);
//   const numberOfPeopleAtRisk = (malariaIncidence * populationAtRisk) / 1000; // Malaria incidence rate per 1000

//   let alertLevel = "safe";

//   console.log(`People at risk: ${numberOfPeopleAtRisk}`);
//   console.log(`Alert Threshold: ${alertThreshold}`);
//   console.log(`Action Threshold: ${actionThreshold}`);

//   if (numberOfPeopleAtRisk >= actionThreshold) {
//     alertLevel = "endemic";
//   } else if (numberOfPeopleAtRisk >= alertThreshold) {
//     alertLevel = "alert";
//   }

//   switch (alertLevel) {
//     case "safe":
//       // Render notification for "safe" state
//       return { msg: "No likelyhood of an outbreak", style: "alert-success" };

//     case "alert":
//       // Render notification for "alert" state
//       return { msg: "Alert: Monitor the situation closely.", style: "alert-warning" };

//     case "endemic":
//       // Render notification for "endemic" state
//       return { msg: "Endemic: Take necessary actions to control the outbreak.", style: "alert-error" };

//     default:
//       return null;
//   }
// };

// const calculateAverage = (data, property) => {
//   const sum = data.reduce((accumulator, item) => {
//     return accumulator + item[property];
//   }, 0);

//   const average = sum / data.length;
//   return average;
// };

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

  // Function to predict malaria_incidence
  // const predictMalariaIncidence = async (location) => {
  //   // Fetch weather data
  //   setLoading(true);
  //   const weatherData = await fetchWeatherDataFromFirebase();

  //   // Make prediction
  //   const prediction = await predictiveModelInference(weatherData[0], weatherData[1], weatherData[2]); // relative_humidity, temperature, precipitation

  //   // Generate alert
  //   const alertLevel = getAlertState(prediction, location);
  //   setLoading(false);
  //   setAlertLevel(alertLevel);
  // };

  const [selectedCounty, setSelectedCounty] = useState(null);

  return (
    <StateContext.Provider
      value={{ selectedCounty, setSelectedCounty, loading, alertLevel, countries, countryId, setCountryId, total_malaria_cases_per_year, getTotalPopulation, predictiveModelInference }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
