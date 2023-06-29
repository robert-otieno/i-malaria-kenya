import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData } from '../api/malariaAPI';
import * as tf from '@tensorflow/tfjs';
// const tfjs_model = require('../tfjs_model/model.json')
const StateContext = createContext()

// const initialState = {
//     chat: false,
//     cart: false,
//     userProfile: false,
//     notification: false,
// }

export const ContextProvider = ({ children }) => {
    // const [activeMenu, setActiveMenu] = useState(true)
    // const [isClicked, setIsClicked] = useState(initialState)
    // const [screenSize, setScreenSize] = useState(undefined)
    const [countriesData, setCountriesData] = useState([]);
    const [countryId, setCountryId] = useState('');
    // get weather data from rapidapi
    const [location, setLocation] = useState('');
    // const [currentColor, setCurrentColor] = useState('#03C9D7')
    // const [currentMode, setCurrentMode] = useState('Light')
    // const [themeSettings, setThemeSettings] = useState(false)

    // const setMode = (e) => {
    //     setCurrentMode(e.target.value);
    //     localStorage.setItem('themeMode', e.target.value);
    // }

    // const setColor = (color) => {
    //     setCurrentColor(color);
    //     localStorage.setItem('colorMode', color);
    // }

    // const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true })

    // Define a functional component to handle the model training and prediction

    const [model, setModel] = useState(null);
    const [newData, setNewData] = useState([
        {
            "year": 2016,
            "precipitation": 59.60018333,
            "relative_humidity": 0.755792502,
            "temperature": 25.75660833,
            // "malaria_incidence": 65.96
        }
    ]);
    const [predictions, setPredictions] = useState([]);

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
        getCountriesData().then((data) => setCountriesData(data))
    }, []);

    // load customised randomforest model
    useEffect(() => {
        // Function to load the model
        const loadModel = async () => {
            // load the Random Forest model
            // const model = await tf.loadLayersModel('../../tfjs_model/model.json');
            const model = await tf.loadLayersModel('http://127.0.0.1:8080/model.json');

            // Set the loaded model
            setModel(model);
        };

        loadModel();
    }, []);

    // useEffect(() => {
    //     // Function to make predictions
    //     const predict = () => {
    //         // Return if model is not trained or there is no new data
    //         if (!model || newData.length === 0) return;

    //         // Extract the features from the new data
    //         const newFeatures = newData.map((data) => [
    //             data.precipitation,
    //             data.relative_humidity,
    //             data.temperature,
    //         ]);
    //         console.log(newFeatures);

    //         // Prepare your input data as a Tensor
    //         const newFeaturesTensor = tf.tensor2d(newFeatures, [newFeatures.length, 3]);

    //         // Make predictions
    //         const result = model.predict(newFeaturesTensor);
    //         setPredictions(result);

    //         // Clean up
    //         tf.dispose(newFeaturesTensor);
    //     };

    //     // Make predictions when newData or model changes
    //     predict();
    // }, [newData, model]);

    // useEffect(() => {
    //     // Function to make predictions
    //     const predict = async () => {
    //         // Return if model is not trained or there is no new data
    //         // if (!model || newData.length === 0) return;

    //         const model = await tf.loadLayersModel('');

    //         // Extract the features from the new data
    //         const newFeatures = newData.map((data) => [data.precipitation, data.relative_humidity, data.temperature]);

    //         // Convert new features data to a tensor
    //         const newFeaturesTensor = tf.tensor2d(newFeatures, [newFeatures.length, 3]);

    //         // Make predictions
    //         const result = model.predict(newFeaturesTensor).dataSync();
    //         setPredictions(result);

    //         // Clean up
    //         tf.dispose(newFeaturesTensor);
    //     };

    //     // Make predictions when newData or model changes
    //     predict();
    // }, [newData]);


    console.log(`new prediction: ${predictions}`);

    return (
        <StateContext.Provider value={{ countriesData, countryId, setCountryId }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)