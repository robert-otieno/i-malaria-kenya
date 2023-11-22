import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { RiArrowRightSFill } from "react-icons/ri";

import { Header, HeatMap } from "../components";
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

  return (
    <>
      {/* <div className="bg-teal-800 p-3 space-y-2 sticky top-0">
        <Header nav={"/"} title={country.name} />
      </div> */}

      <div className="flex flex-row">
        {/* <div className=" w-1/6">
          <div className="h-screen overflow-auto scrollbar-hide">
            {countryId === "ken" ? (
              <div className="w-full text-sm font-semibold text-gray-900 bg-white dark:bg-gray-700 dark:text-white">
                {counties.map((county, i) => (
                  <NavLink
                    to={`/ken/${county.code}`}
                    key={i}
                    state={{ countyName: county.name }}
                    className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="tracking-wide">{county.name}</h5>
                      <RiArrowRightSFill />
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="p-4 m-4 border border-teal-300 rounded-lg bg-teal-50 dark:bg-teal-300" role="alert">
                <div className="flex items-center">
                  <BsFillInfoCircleFill className="w-5 h-5 mr-2 animate-pulse text-blue-500" />
                  <span className="sr-only">Info</span>
                  <h3 className="text-lg font-medium text-teal-900">Data Alert</h3>
                </div>

                <div className="mt-2 mb-4 text-sm text-teal-900">No Data Available at the moment</div>
              </div>
            )}
          </div>
        </div> */}

        <div className="heat_map w-1/2">
          <div className="h-screen">
            <div className="map h-full">
              <HeatMap />
            </div>
          </div>
        </div>

        <section className="flex w-1/2 h-full">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Country;
