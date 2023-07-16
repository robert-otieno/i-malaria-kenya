import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData } from "../api/malariaAPI";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [location, setLocation] = useState("");

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

  return <StateContext.Provider value={{ countriesData, countryId, setCountryId, location, setLocation }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
