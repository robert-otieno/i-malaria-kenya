import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Footer } from "./components";
import { Home, Country, MalariaUpdate, Map, Contact, WeatherForecast } from "./pages";
import { County } from "./pages/County";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    // <div className="relative min-h-full mx-auto border border-teal-600">
    <BrowserRouter>
      <Routes>
        {/* Global */}
        <Route path="/" element={<Home />} />
        <Route path="/update" element={<MalariaUpdate />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forecast" element={<WeatherForecast />} />
        {/* Local */}
        <Route path="/:countryId" element={<Country />} />
        <Route path="/:countryId/update" element={<MalariaUpdate />} />
        <Route path="/:countryId/map" element={<Map />} />
        <Route path="/:countryId/contact" element={<Contact />} />
        <Route path="/:countryId/forecast" element={<WeatherForecast />} />

        <Route path="/ken/:county" element={<County />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
};

export default App;
