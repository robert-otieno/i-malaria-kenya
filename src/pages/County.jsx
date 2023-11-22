import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TbTemperatureCelsius, TbCloudRain } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaMosquito } from "react-icons/fa6";

// local assets
import { HeatMap, LineChart } from "../components";
import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";
// import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";

export const County = () => {
  // const { predictMalariaIncidence, alertLevel, loading, fetchWeatherData } = useStateContext();
  const location = useLocation();
  const { countyName } = location.state;
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeatherData(countyName);
      setWeatherData(weatherData);
    };
    fetchData();
  }, [countyName]);

  // Filter the malaria data for the selected county
  const countyData = malariaCasesPerYear[countyName];

  // Check if the county data exists
  if (!countyData) {
    return <div>No data available for the selected county.</div>;
  }

  // Generate the table rows for each year
  const tableRows = Object.entries(countyData).map(([year, cases]) => (
    <tr key={year}>
      <td>{year}</td>
      <td className="text-right font-bold">{cases.toLocaleString()}</td>
    </tr>
  ));

  return (
    <div className="flex flex-col min-h-screen overflow-auto w-full p-3">
      <TodayDate />
      {/* Stats */}
      <div className="flex flex-row gap-3">
        {weatherData && (
          <>
            <StatsCard feature="precipitation" value={weatherData[2]} IconComponent={TbCloudRain} iconStyle="text-success" />
            <StatsCard feature="Humidity" value={weatherData[1]} IconComponent={WiHumidity} iconStyle="text-info" />
            <StatsCard feature="Temperature" value={weatherData[0]} IconComponent={TbTemperatureCelsius} iconStyle="text-warning" />
            <StatsCard feature="Malaria Incidence" value={123} IconComponent={FaMosquito} iconStyle="dark:text-primary-content" />
          </>
        )}
      </div>

      <div className="card w-full bg-base-100 shadow-xl ">
        <div className="card-body flex flex-row gap-3 p-3">
          <div className="w-1/2">
            <h3 className="card-title capitalize">total malaria cases per year over the last 5 years for {`${countyName} County`}</h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Total Cases</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>

          <div className="w-1/2">
            <h3 className="card-title capitalize">Malaria Cases over time</h3>
            <LineChart data={countyData} height={175} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ feature, value, iconStyle, IconComponent }) => (
  <div className="block rounded-lg bg-white p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-1/3">
    <div className="flex flex-wrap -mx-4 outline-none">
      <div className="w-2/5 md:w-1/3 pr-4 pl-4">{IconComponent && <IconComponent className={iconStyle} size={64} />}</div>
      <div className="w-3/5 md:w-2/3 pr-4 pl-4 text-right text-xl">
        <h5 className="mb-2 text-lg font-medium leading-tight text-neutral-600 dark:text-neutral-200 capitalize">{feature}</h5>
        <p className="mb-4 text-2xl font-semibold text-neutral-800 dark:text-neutral-50">{value}</p>
      </div>
    </div>
  </div>
);

const TodayDate = () => {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-row pb-3 gap-3">
      <p>Today's Date:</p>
      <p>{formattedDate}</p>
    </div>
  );
};

const fetchWeatherData = async (location) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${location}` },
      headers: {
        "X-RapidAPI-Key": "98d5f6252dmsh6d86ab92df5d9d5p1dc650jsn0e282e3b3c32",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    });
    const { humidity, temp_c, precip_mm } = data.current;
    const weatherData = [temp_c, humidity, precip_mm];
    return weatherData;
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw error;
  }
};
