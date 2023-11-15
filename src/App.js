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
        <Route path="/:countryId" element={<Country />}>
          <Route path="/:countryId/:county" element={<County />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
