import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Country } from "./pages";
import { County } from "./pages/County";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryId" element={<Country />} />
        <Route path="/ken/:county" element={<County />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
