import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData } from "../api/malariaAPI";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [location, setLocation] = useState("");

  const [model, setModel] = useState(null);
  const [newData, setNewData] = useState([
    {
      year: 2016,
      precipitation: 59.60018333,
      relative_humidity: 0.755792502,
      temperature: 25.75660833,
      // "malaria_incidence": 65.96
    },
  ]);
  const [predictions, setPredictions] = useState([]);
  const MODEL_URL = "https:/i-malaria-kenya.vercel.app/tfdf_model/model.json";
  // const MODEL_URL = "http:/localhost:3000/tfdf_model/model.json";

  /**
   * When there is a malaria outbreak, a certain number of cases in a specific location within a certain timeframe must be surpassed,
   * which is referred to as a threshold. There are different types of thresholds, including alert and action/epidemic thresholds,
   * which indicate when further investigation or action is necessary. The UNHCR, (2023), considers the threshold for a malaria outbreak
   * to be 1.5 times the baseline over the previous three weeks. In Kenya, two types of thresholds are used: alert and action/epidemic thresholds.
   * The alert threshold signals to health workers that more investigations are necessary, while the action/epidemic threshold is reached when
   * there is a consistent increase above the alert threshold, indicating that further action or response is necessary.
   * The alert threshold is calculated by finding the third quartile of the number of cases per week over at least five years,
   * and the action/epidemic threshold is calculated by finding the mean plus 1.5 standard deviations of the number of cases per week over at least five years
   */

  // alert
  // interface
  // documentation

  useEffect(() => {
    getCountriesData().then((data) => setCountriesData(data));
  }, []);

  //   load customised randomforest model
  useEffect(() => {
    // Function to load the model
    const loadModel = async () => {
      // load the Random Forest model
      const model = await window.tfdf.loadTFDFModel(MODEL_URL);
      // Set the loaded model
      console.log("Model loaded!");
      setModel(model);
    };

    loadModel();
  }, []);

  useEffect(() => {
    // Function to make predictions
    const predict = async () => {
      // Return if model is not trained or there is no new data
      if (!model || newData.length === 0) return;

      // Extract the features from the new data
      const newFeatures = newData.map((data) => [data.year, data.precipitation, data.relative_humidity, data.temperature]);

      // Prepare your input data as a Tensor
      const newFeaturesTensor = window.tf.tensor2d(newFeatures, [newFeatures.length, 4]);

      // Make predictions
      // const result = model.predict(newFeaturesTensor);
      const result = await model.executeAsync(newFeaturesTensor);
      const predictionData = result.dataSync();
      console.log(predictionData[1]);
      // setPredictions(result);

      // Clean up
      window.tf.dispose(newFeaturesTensor);
    };

    // Make predictions when newData or model changes
    predict();
  }, [newData, model]);

  console.log(`new prediction: ${predictions}`);

  return <StateContext.Provider value={{ countriesData, countryId, setCountryId, location, setLocation, setNewData }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
