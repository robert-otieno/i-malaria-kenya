import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData } from "../utilities/functions";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getCountriesData().then((data) => setCountriesData(data));
  }, []);

  return <StateContext.Provider value={{ countriesData, countryId, setCountryId, location, setLocation }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
