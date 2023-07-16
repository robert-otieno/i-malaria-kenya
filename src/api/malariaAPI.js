import axios from "axios";
import { DateTime } from "luxon";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

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
