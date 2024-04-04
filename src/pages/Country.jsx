import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaArrowRight, FaMosquito, FaPowerOff } from "react-icons/fa6";

import { HeatMap } from "../components";
import { useStateContext } from "../utils/ContextProvider";
import counties from "../assets/counties.json";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { formatDate } from "../utils/utils";

const Country = () => {
  const { countries, selectedCounty, setSelectedCounty } = useStateContext();
  const [country, setCountry] = useState(null);
  const [countryId] = useState("ken");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // Check if user is signed in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        // User is signed out
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    const countryDetails = (countries, countryId) => {
      return countries?.find((country) => {
        return country.code.toLowerCase() === countryId;
      });
    };

    const country = countryDetails(countries, countryId);
    setCountry(country);
  }, [countries, countryId]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };

  return isAuthenticated ? (
    <div className='flex flex-col md:flex-row overflow-hidden'>
      <div className='hidden md:block heat_map w-full md:w-2/3'>
        <div className='h-screen'>
          {countryId === "ken" ? (
            <div className='map h-full'>
              <HeatMap />
            </div>
          ) : (
            <div className='p-4 m-4 border border-teal-300 rounded-lg bg-info' role='alert'>
              <div className='flex items-center'>
                <BsFillInfoCircleFill className='w-5 h-5 mr-2 animate-pulse ' />
                <span className='sr-only'>Info</span>
                <h3 className='text-lg font-medium text-info-content'>Data Alert</h3>
              </div>

              <div className='mt-2 mb-4 text-sm text-info-content'>No Data Available at the moment</div>
            </div>
          )}
        </div>
      </div>

      <section className='flex flex-col w-full md:w-1/3 h-screen'>
        <div className='navbar bg-teal-800 text-white'>
          <div className='flex-1'>
            <FaMosquito size={32} />
            <NavLink to='/ken' className='btn btn-ghost text-xl normal-case font-sans dark:text-neutral-50'>
              iMalaria - {country?.name}
            </NavLink>
          </div>

          <div className='flex-none gap-2'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-neutral btn-sm m-1 capitalize'>
                {selectedCounty ? selectedCounty.countyName : "Select County"}
              </label>
              <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-sm font-semibold dark:bg-gray-700 dark:text-white overflow-y-scroll'>
                {counties.map((county, i) => (
                  <NavLink
                    to={`/ken/${county.code}`}
                    key={i}
                    state={{ countyName: county.name }}
                    onClick={() => setSelectedCounty({ countyName: county.name, countyCode: county.code })}
                    className='block py-2 px-4 w-full border-b text-teal-900 border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
                  >
                    <div className='flex items-center justify-between'>
                      <h5 className='tracking-wide'>{county.name}</h5>
                    </div>
                  </NavLink>
                ))}
              </ul>
            </div>
            <button className='hover:bg-error/80 btn btn-sm btn-circle hover:btn-outline' onClick={() => handleSignOut()}>
              <FaPowerOff size={20} />
            </button>
          </div>
        </div>

        <div className='p-3 h-full'>
          <div className='stats shadow w-full'>
            <div className='stat'>
              <div className='stat-title'>Location</div>
              <div className='stat-value text-sm md:text-lg capitalize'>{(selectedCounty && selectedCounty.countyName) || country?.name}</div>
            </div>

            <div className='stat'>
              <div className='stat-title'>Date</div>
              <div className='stat-value text-sm md:text-lg'>{formatDate(new Date())}</div>
            </div>
          </div>

          <Outlet />
        </div>

        <footer className='footer footer-center p-4 bg-base-300 text-base-content'>
          <aside>
            <p>Copyright © 2023 - All Data based on 2019 Census - Kenya Bureau of Statistics</p>
          </aside>
        </footer>
      </section>
    </div>
  ) : (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md flex flex-col'>
          <h1 className='text-5xl font-bold'>Oops!</h1>
          <p className='py-6'>You must login to use this application. </p>
          <NavLink to='/login' className='flex items-center gap-5 self-center rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-400 md:text-base'>
            <span>Log in</span> <FaArrowRight className='w-5 md:w-6' />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Country;
