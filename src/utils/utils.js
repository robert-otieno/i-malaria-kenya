import axios from "axios";

import counties from "../assets/counties.json";

export const capitalize = (word) => {
  return word
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export const formatDate = (date) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// GET Countries data
export const getCountriesData = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTotalPopulation = (locationName, countiesData) => {
  const location = countiesData.find((item) => item.name === locationName);
  if (location) {
    return location.population.total;
  } else {
    return null; // Location not found in the data array
  }
};

export const total_malaria_cases_per_year = (malariaData) => {
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

//
export const getCountry = (countriesData) => {
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
  return countries;
};

export const getLatLng = (code) => {
  const county = counties?.find((county) => county.code === parseInt(code));
  return county ? { lat: county.lat, lng: county.lng } : null;
};
