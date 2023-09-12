import { collection, query, where, getDocs } from "firebase/firestore";
import { DateTime } from "luxon";
import { db } from "../../firebase";

export const fetchWeatherData = async () => {
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
