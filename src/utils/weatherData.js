import { fetchWeatherApi } from "openmeteo";

export async function getWeatherData(lat, lng) {
  const params = {
    latitude: lat,
    longitude: lng,
    current: ["temperature_2m", "relative_humidity_2m", "precipitation"],
    forecast_days: 1,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  //   const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();

  const current = response.current();

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0).value(),
      relativeHumidity2m: current.variables(1).value(),
      precipitation: current.variables(2).value(),
    },
  };

  return weatherData;
}
