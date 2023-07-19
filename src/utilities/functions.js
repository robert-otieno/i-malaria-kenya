import malariaData from "../assets/structured_malaria_data.json";
import axios from "axios";
import { DateTime } from "luxon";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const getCountriesData = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

// function to fetch daily weather data
const fetchWeatherData = async (location) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      // params: { q: "Kenya" },
      params: { q: `${location}` },
      headers: {
        "X-RapidAPI-Key": "98d5f6252dmsh6d86ab92df5d9d5p1dc650jsn0e282e3b3c32",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    });
    const { last_updated, humidity, temp_c, precip_mm } = data.current;
    const weatherData = [last_updated, temp_c, humidity, precip_mm];
    return weatherData;
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw error;
  }
};

// storage for retrieved weather data - firebase
const fetchAndSaveWeatherData = async () => {
  try {
    const weatherData = await fetchWeatherData("Nairobi");
    // Send weather data to Firestore
    await db.collection("weatherData").add(weatherData);
    const docRef = await addDoc(collection(db, "weatherData"), {
      createdAt: weatherData[0],
      humidity: weatherData[1],
      temperature: weatherData[2],
      precipitation: weatherData[3],
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("An error occurred while fetching and saving weather data:", error);
    return null;
  }
};

// function to schedule fetching of weather data
const scheduleWeatherData = async () => {
  const currentDate = DateTime.local();
  const nextMidnight = currentDate.plus({ days: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const timeToNextMidnight = nextMidnight.diff(currentDate).as("milliseconds");

  setTimeout(async () => {
    const success = await fetchAndSaveWeatherData();
    if (success) {
      scheduleWeatherData();
    }
  }, timeToNextMidnight);
};

scheduleWeatherData();

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

const runModel = async () => {
  try {
    const weatherDataRef = collection(db, "weatherData");
    const snapshot = await getDocs(weatherDataRef);
    const weatherData = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      weatherData.push(data);
    });

    const averageHumidity = calculateAverage(weatherData, "humidity");
    const averageTemperature = calculateAverage(weatherData, "temperature");
    const averageRainfall = calculateAverage(weatherData, "precipitation");

    // Send data for malaria prediction
    sendToMalariaPrediction(averageHumidity, averageTemperature, averageRainfall);

    console.log("Data sent for prediction:", {
      averageHumidity,
      averageTemperature,
      averageRainfall,
    });
  } catch (error) {
    console.error("Error retrieving weather data:", error);
  }
};

const calculateAverage = (data, property) => {
  const sum = data.reduce((accumulator, item) => {
    return accumulator + item[property];
  }, 0);

  const average = sum / data.length;
  return average;
};

const sendToMalariaPrediction = (humidity, temperature, rainfall) => {
  // Code to send the data to the other website for malaria prediction
  // Replace the URL below with the actual endpoint of the website
  const predictionEndpoint = "http://192.168.0.14:5000/predict";

  // Make an HTTP request to the prediction endpoint with the data
  // You can use libraries like axios or fetch to send the request
  // Example using fetch:
  fetch(predictionEndpoint, {
    method: "POST",
    body: JSON.stringify({
      year: 2016,
      relative_humidity: humidity,
      temperature: temperature,
      precipitation: rainfall,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Prediction request successful");
      } else {
        console.error("Prediction request failed:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error sending prediction request:", error);
    });
};

/**
 * When there is a malaria outbreak, a certain number of cases in a specific location within a certain timeframe must be surpassed,
 * which is referred to as a threshold. There are different types of thresholds, including alert and action/epidemic thresholds,
 * which indicate when further investigation or action is necessary. The UNHCR, (2023), considers the threshold for a malaria outbreak
 * to be 1.5 times the baseline over the previous three weeks. In Kenya, two types of thresholds are used: alert and action/epidemic thresholds.
 * The alert threshold signals to health workers that more investigations are necessary, while the action/epidemic threshold is reached when
 * there is a consistent increase above the alert threshold, indicating that further action or response is necessary.
 * The alert threshold is calculated by finding the third quartile of the number of cases per week over at least five years,
 * and the action/epidemic threshold is calculated by finding the mean plus 1.5 standard deviations of the number of cases per week over at least five years
 */

// alert
// interface
// documentation

export { total_malaria_cases_per_year, runModel };
