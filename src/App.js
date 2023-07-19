import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Footer } from "./components";
import { Home, Country } from "./pages";
import { County } from "./pages/County";
import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    // <div className="relative min-h-full mx-auto border border-teal-600">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryId" element={<Country />} />
        <Route path="/ken/:county" element={<County />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
};

export default App;
