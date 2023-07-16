import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

import { AiOutlineAlert, AiOutlineSafety } from "react-icons/ai";
import { TbAlertTriangle } from "react-icons/tb";

import { Footer, Header, HeatMap, LineChart } from "../components";
import Map from "./Map";

import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";

export const County = () => {
  //   const runModel = async () => {
  //     try {
  //       const weatherDataRef = collection(db, "weatherData");
  //       const snapshot = await getDocs(weatherDataRef);
  //       const weatherData = [];

  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         weatherData.push(data);
  //       });

  //       const averageHumidity = calculateAverage(weatherData, "humidity");
  //       const averageTemperature = calculateAverage(weatherData, "temperature");
  //       const averageRainfall = calculateAverage(weatherData, "precipitation");

  //       // Send data for malaria prediction
  //       sendToMalariaPrediction(averageHumidity, averageTemperature, averageRainfall);

  //       console.log("Data sent for prediction:", {
  //         averageHumidity,
  //         averageTemperature,
  //         averageRainfall,
  //       });
  //     } catch (error) {
  //       console.error("Error retrieving weather data:", error);
  //     }
  //   };

  //   const calculateAverage = (data, property) => {
  //     const sum = data.reduce((accumulator, item) => {
  //       return accumulator + item[property];
  //     }, 0);

  //     const average = sum / data.length;
  //     return average;
  //   };

  //   const sendToMalariaPrediction = (humidity, temperature, rainfall) => {
  //     // Code to send the data to the other website for malaria prediction
  //     // Replace the URL below with the actual endpoint of the website
  //     const predictionEndpoint = "http://192.168.0.14:5000/predict";

  //     // Make an HTTP request to the prediction endpoint with the data
  //     // You can use libraries like axios or fetch to send the request
  //     // Example using fetch:
  //     fetch(predictionEndpoint, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         year: 2016,
  //         relative_humidity: humidity,
  //         temperature: temperature,
  //         precipitation: rainfall,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Prediction request successful");
  //         } else {
  //           console.error("Prediction request failed:", response.status);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error sending prediction request:", error);
  //       });
  //   };

  const location = useLocation();
  const { countyName } = location.state;
  const { county } = useParams();
  const [notification, setNotification] = useState("endemic");

  // Filter the malaria data for the selected county
  const countyData = malariaCasesPerYear[countyName];

  console.log(countyName);

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
    <div className="flex flex-col min-h-screen overflow-auto">
      <div className="bg-teal-800 p-3 space-y-2 top-0">
        <Header nav={"/ken"} title={`${countyName} County`} />
      </div>
      <div className="inner-container flex flex-grow p-5">
        <div className="flex-grow pr-4">
          <div className="flex items-center mb-5 justify-between">
            <h1 className="text-3xl font-bold text-teal-800">Malaria Alert System</h1>
            <div className="predictive_model__btn">
              <button className="btn md:w-36 lg:w-64 text-white bg-teal-700 hover:text-teal-700 rounded-full">Run Predictive model</button>
            </div>
          </div>

          <div className="notification mb-5">
            {notification === "normal" ? (
              <div className="alert alert-success">
                <AiOutlineSafety size={24} />
                <span className="capitalize">Low risk area!</span>
              </div>
            ) : notification === "alert" ? (
              <div className="alert alert-warning">
                <AiOutlineAlert size={24} />
                <span className="capitalize">Alert: Investigation Needed!</span>
              </div>
            ) : (
              <div className="alert alert-error">
                <TbAlertTriangle size={24} />
                <span className="capitalize">Action Required! Endemic Region.</span>
              </div>
            )}
          </div>

          {/* map */}
          <div className="heat_map">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body p-2 h-[540px] map">
                <HeatMap />
              </div>
            </div>
          </div>
        </div>

        <div className="inner-container__right flex-1">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h3 className="card-title capitalize">total malaria cases per year over the last 5 years for {`${countyName} County`}</h3>
              {/* table */}
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
              <h3 className="card-title capitalize my-3">Malaria Cases over time</h3>

              {/* chart */}
              <LineChart data={countyData} height={175} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="footer">
        <div className="contact"></div>
        <div className="news"></div>
        <div className="weather_forecast"></div>
      </div> */}

      {/* <Footer /> */}
    </div>
  );
};
