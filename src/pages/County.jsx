import React from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { Footer, Header } from "../components";
import { AiOutlineSafety } from "react-icons/ai";

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

  const { county } = useParams();

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <div className="bg-teal-800 p-3 space-y-2 top-0">
        <Header title={`County ${county}`} />
      </div>
      <div className="inner-container flex flex-grow p-5">
        <div className="flex-grow pr-4">
          <div className="flex items-center mb-5 justify-between">
            <h1 className="text-3xl text-teal-800">Malaria Alert System</h1>
            <div className="predictive_model__btn">
              <button class="btn w-64 text-white bg-teal-700 hover:text-teal-700 rounded-full">Run Predictive model</button>
            </div>
          </div>

          <div className="notification">
            <div className="alert alert-success">
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
              <AiOutlineSafety />
              <span>Your purchase has been confirmed!</span>
            </div>
          </div>

          <div className="heat_map"></div>
        </div>

        <div className="inner-container__right flex-1">
          <h3 className="subtitle">Cases per individual stations</h3>
          {/* table */}
          <h3 className="subtitle">Recent malaria cases &gt; last 5 weeks</h3>
          {/* chart */}
        </div>
      </div>

      {/* <div className="footer">
        <div className="contact"></div>
        <div className="news"></div>
        <div className="weather_forecast"></div>
      </div> */}

      <Footer />
    </div>
  );
};
