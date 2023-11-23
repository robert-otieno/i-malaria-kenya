import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiArrowRightSFill } from "react-icons/ri";
import { FaMosquito } from "react-icons/fa6";

import { HeatMap } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import counties from "../assets/counties.json";

const Country = () => {
  const { countryId } = useParams();
  const { countries } = useStateContext();

  const countryDetails = (countries, countryId) => {
    return countries?.find((country) => {
      return country.code.toLowerCase() === countryId;
    });
  };

  const country = countryDetails(countries, countryId);

  const { selectedCounty, setSelectedCounty } = useStateContext();

  /**
   * Today's date
   */
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="heat_map w-2/3">
        <div className="h-screen">
          {countryId === "ken" ? (
            <div className="map h-full">
              <HeatMap />
            </div>
          ) : (
            <div className="p-4 m-4 border border-teal-300 rounded-lg bg-info" role="alert">
              <div className="flex items-center">
                <BsFillInfoCircleFill className="w-5 h-5 mr-2 animate-pulse " />
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium text-info-content">Data Alert</h3>
              </div>

              <div className="mt-2 mb-4 text-sm text-info-content">No Data Available at the moment</div>
            </div>
          )}
        </div>
      </div>

      <section className="flex flex-col w-1/3 h-screen">
        <div className="navbar bg-teal-800 text-white">
          <div className="flex-1">
            <FaMosquito size={32} />
            <NavLink to="/" className="btn btn-ghost text-xl normal-case font-sans">
              iMalaria - {country.name}
            </NavLink>
          </div>

          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-neutral btn-sm m-1 capitalize">
                {selectedCounty ? selectedCounty.countyName : "Select County"}
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-sm font-semibold dark:bg-gray-700 dark:text-white overflow-y-scroll">
                {counties.map((county, i) => (
                  <NavLink
                    to={`/ken/${county.code}`}
                    key={i}
                    state={{ countyName: county.name }}
                    onClick={() => setSelectedCounty({ countyName: county.name, countyCode: county.code })}
                    className="block py-2 px-4 w-full border-b text-teal-900 border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="tracking-wide">{county.name}</h5>
                      <RiArrowRightSFill />
                    </div>
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 h-full">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-title">Location</div>
              <div className="stat-value text-lg capitalize">{(selectedCounty && selectedCounty.countyName) || country.name}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Date</div>
              <div className="stat-value text-lg">{formattedDate}</div>
            </div>
          </div>

          <Outlet />
        </div>

        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <aside>
            <p>Copyright © 2023 - All Data based on 2019 Census - Kenya Bureau of Statistics</p>
          </aside>
        </footer>
      </section>
    </div>
  );
};

export default Country;
