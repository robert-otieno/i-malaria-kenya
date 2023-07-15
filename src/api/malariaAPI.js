import axios from "axios";
// import { DateTime } from 'luxon';

export const getCountriesData = async () => {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    return data;

  } catch (error) {
    console.error(error);
  }
};

// function to fetch daily weather data

const fetchWeatherData = async ({ location }) => {
  try {
    const { data } = await axios.request(
      {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: 'Kenya' },
        // params: { q: `${location}` },
        headers: {
          'X-RapidAPI-Key': '98d5f6252dmsh6d86ab92df5d9d5p1dc650jsn0e282e3b3c32',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }
    );
    const { last_updated, humidity, temp_c, precip_mm } = data.current;
    const csvData = `${last_updated},${temp_c},${humidity},${precip_mm}`;
    return csvData;
  } catch (error) {
    console.error('An error occurred while fetching weather data:', error);
    throw error;
  }
};

// storage for retrieved weather data - firebase

// { * write some code here * }

// function to save weather data

// const fetchAndSaveWeatherData = async () => {
//   try {
//     const csvData = await fetchWeatherData();
//     const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
//     const filename = `weather_${currentDate}.csv`;
//     // await createCSVFile(filename, [csvData]);
//     return filename;
//   } catch (error) {
//     console.error('An error occurred while fetching and saving weather data:', error);
//     return null;
//   }
// };

// function to schedule fetching of weather data

// const scheduleWeatherData = async () => {
//   const currentDate = DateTime.local();
//   const nextMidnight = currentDate.plus({ days: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
//   const timeToNextMidnight = nextMidnight.diff(currentDate).as('milliseconds');

//   setTimeout(async () => {
//     const filename = await fetchAndSaveWeatherData();
//     if (filename) {
//       scheduleWeatherData();
//     }
//   }, timeToNextMidnight);
// };

// Using tensor flow, define a model for randomforest regression in tensorflow js

// retrieve data set from firebase storage

// preprocess data for training

// Train the model using the data.

// Use the model to do inference on a data point the model hasn't seen before: (prediction)

// schedule