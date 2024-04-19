import React, { createContext, useContext, useState, useEffect } from "react";
import { getCountriesData, getCountry } from "./utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Extract country name and country code from countriesData
  const countries = getCountry(countriesData);

  useEffect(() => {
    getCountriesData().then((data) => setCountriesData(data));
  }, []);

  // Check if user is signed in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <StateContext.Provider
      value={{
        selectedCounty,
        setSelectedCounty,
        countries,
        countryId,
        setCountryId,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
