import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Country } from "./pages";
import { County } from "./pages/County";
import "leaflet/dist/leaflet.css";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/ken' element={<Country />}>
          <Route path='/ken/:county' element={<County />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
