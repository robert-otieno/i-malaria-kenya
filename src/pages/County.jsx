import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TbTemperatureCelsius, TbCloudRain } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaMosquito } from "react-icons/fa6";

// local assets
import { LineChart } from "../components";
import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

export const County = () => {
  const { predictiveModelInference, alertLevel, loading } = useStateContext();
  const location = useLocation();
  const { countyName } = location.state;

  const [weatherData, setWeatherData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  prediction && console.log(prediction);

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeatherData(countyName);
      setWeatherData(weatherData);
    };
    fetchData();
  }, [countyName]);

  useEffect(() => {
    const fetchData = async () => {
      const predictedIncidence = await predictiveModelInference(weatherData);
      setPrediction(predictedIncidence);
    };

    fetchData();
  }, [weatherData, predictiveModelInference]);

  const capitalize = (word) => {
    return word
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // Filter the malaria data for the selected county
  const countyData = malariaCasesPerYear[capitalize(countyName)];

  // Check if the county data exists
  if (!countyData) {
    return (
      <div role='alert' className='alert'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='stroke-info shrink-0 w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <span>
          <b>Info - </b>No data available for the selected county.
        </span>
      </div>
    );
  }

  // Generate the table rows for each year
  const tableRows = Object.entries(countyData).map(([year, cases]) => (
    <tr key={year}>
      <td>{year}</td>
      <td className='text-right font-bold'>{cases.toLocaleString()}</td>
    </tr>
  ));

  return (
    <div className='flex flex-col w-full pt-3'>
      {/* Stats */}
      {weatherData && (
        <div className='flex flex-wrap gap-3 px-1'>
          <div className='stats shadow w-full'>
            <div className='stat place-items-center'>
              <div className='stat-title text-sm md:text-base flex flex-row items-center gap-1'>Precipitation</div>
              <div className='stat-value text-2xl font-semibold text-neutral-800 dark:text-neutral-50'>{weatherData[2]}</div>
            </div>

            <div className='stat place-items-center'>
              <div className='stat-title text-sm md:text-base flex flex-row items-center gap-1'>Humidity</div>
              <div className='stat-value text-2xl font-semibold text-neutral-800 dark:text-neutral-50'>{weatherData[1]}</div>
            </div>

            <div className='stat place-items-center'>
              <div className='stat-title text-sm md:text-base flex flex-row items-center gap-1'>Temperature</div>
              <div className='stat-value text-2xl font-semibold text-neutral-800 dark:text-neutral-50'>{weatherData[0]}</div>
            </div>
          </div>
          <StatsCard feature='Malaria Incidence' value={Number(prediction).toFixed(2)} IconComponent={FaMosquito} iconStyle='dark:text-primary-content' />
        </div>
      )}

      <button className='btn btn-lg capitalize btn-neutral my-3 mx-1' onClick={() => document.getElementById("my_modal_2").showModal()}>
        Statistics: Malaria trends overtime
      </button>

      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box w-4/5 max-w-3xl'>
          <div className='flex flex-col gap-3'>
            <div className='w-full'>
              <h3 className='card-title capitalize'>total malaria cases per year over the last 5 years for {`${countyName} County`}</h3>
              <div className='overflow-x-auto'>
                <table className='table table-zebra'>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th className='text-right'>Total Cases</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </table>
              </div>
            </div>

            <div className='w-full'>
              <h3 className='card-title capitalize'>Malaria Cases over time</h3>
              <LineChart data={countyData} height={175} />
            </div>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>

      {/* More details card */}
      {/* <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

const StatsCard = ({ feature, value, iconStyle, IconComponent }) => (
  <div className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 p-4 w-full'>
    <div className='flex flex-wrap outline-none'>
      <div className='md:w-2/5 w-1/4 pr-4 pl-4'>{IconComponent && <IconComponent className={iconStyle} size={36} />}</div>
      <div className='md:w-3/5 w-3/4 pr-4 pl-4 text-right'>
        <h5 className='mb-2 text-sm md:text-lg font-medium leading-tight text-neutral-600 dark:text-neutral-200 capitalize'>{feature}</h5>
        <p className='text-base md:text-2xl font-semibold text-neutral-800 dark:text-neutral-50'>{value}</p>
        <h5 className='mb-2 text-[13px] md:text-sm font-medium leading-tight text-[#9a9a9a] dark:text-neutral-200 capitalize'>Malaria cases (per 100,000 people)</h5>
      </div>
    </div>
  </div>
);

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
