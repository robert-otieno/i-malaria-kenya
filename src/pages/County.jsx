import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaMosquito } from "react-icons/fa6";

// local assets
import { LineChart } from "../components";
import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";
import { historicalMalariaIncidence } from "../assets/data";
import { capitalize, getLatLng } from "../utils/utils";
import { getWeatherData } from "../utils/weatherData";

export const County = () => {
  const location = useLocation();
  let { county } = useParams();
  const { countyName } = location.state;
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [hasWeatherData, setHasWeatherData] = useState(false);
  const { lat, lng } = getLatLng(county);

  // Fetch weather data
  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await fetchWeatherData(lat, lng);
      setWeatherData(weatherData);
      setHasWeatherData(true); // Signal that weather data is fetched
    };
    fetchData();
  }, [lat, lng]);

  // Make a prediction using the loaded model
  useEffect(() => {
    setLoading(true);

    if (hasWeatherData) {
      const fetchData = async () => {
        try {
          const predictedIncidence = await predictiveModelInference(weatherData, countyName);
          setPrediction(predictedIncidence);
        } catch (error) {
          console.error("Error during inference:", error);
          setPrediction(null);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }

    setLoading(false);
  }, [countyName, hasWeatherData, weatherData]);

  // Function to stored predicted values to firebase per county

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
              <div className='stat-value text-2xl font-semibold'>{Number(weatherData[2]).toFixed(2)}</div>
            </div>

            <div className='stat place-items-center'>
              <div className='stat-title text-sm md:text-base flex flex-row items-center gap-1'>Humidity</div>
              <div className='stat-value text-2xl font-semibold'>{Number(weatherData[1]).toFixed(2)}</div>
            </div>

            <div className='stat place-items-center'>
              <div className='stat-title text-sm md:text-base flex flex-row items-center gap-1'>Temperature</div>
              <div className='stat-value text-2xl font-semibold'>{Number(weatherData[0]).toFixed(2)}</div>
            </div>
          </div>
          <StatsCard county={county} feature='Malaria Incidence' value={prediction} loading={loading} IconComponent={FaMosquito} iconStyle='dark:text-primary-content' />
        </div>
      )}

      <button className='btn btn-md text-sm capitalize btn-neutral my-3 mx-1' onClick={() => document.getElementById("my_modal_2").showModal()}>
        Statistics: Malaria trends overtime
      </button>

      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box w-4/5 max-w-3xl'>
          <div className='flex flex-col gap-3'>
            <div className='w-full'>
              <h3 className='card-title capitalize text-sm'>total malaria cases per year over the last 5 years for {countyName} County</h3>
              <div className='overflow-x-auto'>
                <table className='table table-xs table-zebra'>
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
              <h3 className='card-title capitalize text-sm'>Malaria Cases over time</h3>
              <LineChart data={countyData} height={175} />
            </div>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

const StatsCard = ({ feature, value, iconStyle, IconComponent, loading, county }) => (
  <div className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 p-4 w-full'>
    <div className='flex flex-row justify-between align-bottom'>
      {IconComponent && <IconComponent className={iconStyle} size={36} />}
      <h5 className='mb-2 text-sm md:text-base font-medium leading-tight text-neutral-600 dark:text-neutral-200 capitalize'>
        {feature}: {Number(value).toFixed(2)}
      </h5>
    </div>
    <h5 className='mb-2 text-[12px] md:text-sm font-medium leading-tight text-[#9a9a9a] dark:text-neutral-200 capitalize text-right'>Malaria cases (per 1000 people)</h5>

    {loading ? <span className='loading loading-dots loading-sm'></span> : <>{CalculateMalariaThresholds(value, county)}</>}
  </div>
);

const fetchWeatherData = async (lat, lng) => {
  try {
    // Source of current Data - WeatherAPI.com
    // const { data } = await axios.request({
    //   method: "GET",
    //   url: "https://weatherapi-com.p.rapidapi.com/current.json",
    //   params: { q: `${lat},${lng}` },
    //   headers: {
    //     "X-RapidAPI-Key": "98d5f6252dmsh6d86ab92df5d9d5p1dc650jsn0e282e3b3c32",
    //     "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    //   },
    // });

    // const { humidity, temp_c, precip_mm } = data.current;
    // const weatherData = [temp_c, humidity, precip_mm];

    // return weatherData;

    // Source: open-meteo.com
    const { current } = await getWeatherData(lat, lng);

    const { relativeHumidity2m, temperature2m, precipitation } = current;
    const weatherData = [temperature2m, relativeHumidity2m, precipitation];

    return weatherData;
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw error;
  }
};

// Function to run predictive model

const tf = window.tf;
const tfdf = window.tfdf;

const year = new Date().getFullYear();
const month = new Date().toLocaleString("default", { month: "long" });

let modelLoaded = false;
let model;

// Load the model into memory
const loadModel = async () => {
  try {
    model = await tfdf.loadTFDFModel(`http://127.0.0.1:3000/tfdf_model/model.json`);
    modelLoaded = true;
  } catch (error) {
    throw new Error("Could not load TensorFlow.js model.");
  }
};

/**
 * Model is loaded asynchronously. Hence, we initialize it here to be used later for malaria incidence prediction.
 * @param {weatherData, countyName}
 * @returns malaria_incidence (this is the predicted malaria_incidence value)
 */
const predictiveModelInference = async (weatherData, county) => {
  if (!modelLoaded) {
    await loadModel();
  }

  const weatherFeatures = {
    county: tf.tensor([county]),
    month: tf.tensor([month]),
    year: tf.cast(tf.tensor([year]), "int32"),
    precipitation: tf.tensor([weatherData[2]]),
    relative_humidity: tf.tensor([weatherData[1]]),
    temperature: tf.tensor([weatherData[0]]),
  };

  // Perform an inference/prediction
  try {
    const result = await model.executeAsync(weatherFeatures);
    return result.dataSync()[1];
  } catch (error) {
    throw new Error("Error during model inference.", error);
  }
};

/**
 * Baseline Data
 * Collect historical data on malaria incidence
 *
 * Get the average historical incidence of malaria cases seen in the previous 3 weeks
 * Normal Threshold: average historical incidence of malaria cases seen in the previous 3 weeks (baseline)
 * Warning Threshold: the number of malaria cases exceeds the normal threshold but has not reached the alert threshold
 * Alert/Epidemic Threshold: 1.5 * baseline level (indicates a critical situation)
 */

function CalculateMalariaThresholds(currentIncidence, county) {
  const thresholds = useMemo(() => {
    // Historical data processed for the period from April 1st, 2024 to April 15th, 2024
    const { data } = historicalMalariaIncidence?.find((item) => item.code === parseInt(county));
    const averageIncidence = data.reduce((sum, value) => sum + value, 0) / data.length;

    // Calculate thresholds based on average
    const normalThreshold = averageIncidence;
    const alertThreshold = 1.5 * averageIncidence;

    return { normalThreshold, alertThreshold };
  }, [county]);

  // Analyze current incidence
  if (currentIncidence >= thresholds.alertThreshold) {
    return (
      <div role='alert' className='alert alert-error'>
        <p className='text-base text-neutral-50'>
          <strong>Action!</strong> Current incidence <span className='font-bold'>{Number(currentIncidence).toFixed(2)}</span> exceeds the alert threshold{" "}
          <span className='font-bold'>{Number(thresholds.alertThreshold).toFixed(2)}</span>.
        </p>
      </div>
    );
  } else if (currentIncidence <= thresholds.normalThreshold) {
    return (
      <div role='alert' className='alert alert-success'>
        <p className='text-base'>
          <strong>No immediate concern.</strong> Current incidence <span className='font-bold'>{Number(currentIncidence).toFixed(2)}</span> is within acceptable limits{" "}
          <span className='font-bold'>{Number(thresholds.normalThreshold).toFixed(2)}</span>.
        </p>
      </div>
    );
  } else {
    return (
      <div role='alert' className='alert alert-warning'>
        <p className='text-base text-neutral-800 dark:text-neutral-50'>
          <strong>Alert!</strong> Current incidence <span className='font-bold'>{Number(currentIncidence).toFixed(2)}</span> exceeds the normal threshold{" "}
          <span className='font-bold'>{Number(thresholds.normalThreshold).toFixed(2)}</span>.
        </p>
      </div>
    );
  }
}
