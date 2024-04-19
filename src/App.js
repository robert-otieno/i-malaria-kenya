import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Country } from "./pages";
import { County } from "./pages/County";
import "leaflet/dist/leaflet.css";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { useStateContext } from "./utils/ContextProvider";
import Restricted from "./pages/Restricted";

const App = () => {
  const { isAuthenticated } = useStateContext();

  if (!isAuthenticated)
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Restricted />} />
        </Routes>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ken' element={<Country />}>
          <Route path='/ken/:county' element={<County />} />
        </Route>
        {isAuthenticated ? <Route path='*' element={<Country />} /> : null}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
