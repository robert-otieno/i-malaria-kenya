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

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Restricted />} />
          </>
        ) : (
          <>
            <Route path='/ken' element={<Country />}>
              <Route path='/ken/:county' element={<County />} />
            </Route>
            <Route path='*' element={<Country />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
