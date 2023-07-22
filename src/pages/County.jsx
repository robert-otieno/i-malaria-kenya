import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// import { AiOutlineAlert, AiOutlineSafety } from "react-icons/ai";
// import { TbAlertTriangle } from "react-icons/tb";

import { Header, HeatMap, LineChart } from "../components";

import malariaCasesPerYear from "../assets/total_malaria_cases_per_year_over_the_last_5_years.json";
// import { predictMalariaIncidence } from "../utilities/predict_malaria_incidence";
import { useStateContext } from "../contexts/ContextProvider";

export const County = () => {
  const { predictMalariaIncidence, alertLevel, loading } = useStateContext();
  const location = useLocation();
  const { countyName } = location.state;

  // Filter the malaria data for the selected county
  const countyData = malariaCasesPerYear[countyName];

  // Check if the county data exists
  if (!countyData) {
    return <div>No data available for the selected county.</div>;
  }

  // Generate the table rows for each year
  const tableRows = Object.entries(countyData).map(([year, cases]) => (
    <tr key={year}>
      <td>{year}</td>
      <td className="text-right font-bold">{cases.toLocaleString()}</td>
    </tr>
  ));

  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <div className="bg-teal-800 p-3 space-y-2 top-0">
        <Header nav={"/ken"} title={`${countyName} County`} />
      </div>
      <div className="inner-container flex flex-col flex-grow items-center m-5 gap-5 md:flex-row">
        <div className="w-full md:w-3/4">
          <div className="flex items-center mb-5 justify-between">
            <h1 className="text-3xl font-bold text-teal-800 dark:text-teal-400">Malaria Alert System</h1>
            <div className="predictive_model__btn">
              <button onClick={() => predictMalariaIncidence(countyName)} disabled={loading} className="btn md:w-36 capitalize lg:w-64 text-white bg-teal-700 hover:text-teal-700 rounded-full">
                {loading ? <span className="loading loading-infinity loading-lg"></span> : "Run Predictive model"}
              </button>
            </div>
          </div>

          <div className="notification mb-5">
            {alertLevel && (
              <div className={`alert ${alertLevel.style}`}>
                <span className="capitalize">{alertLevel.msg}</span>
              </div>
            )}
          </div>

          {/* map */}
          <div className="heat_map">
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body p-2 h-[300px] md:h-[540px] map">
                <HeatMap />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h3 className="card-title capitalize">total malaria cases per year over the last 5 years for {`${countyName} County`}</h3>
              {/* table */}
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th className="text-right">Total Cases</th>
                    </tr>
                  </thead>
                  <tbody>{tableRows}</tbody>
                </table>
              </div>
              <h3 className="card-title capitalize my-3">Malaria Cases over time</h3>

              {/* chart */}
              <LineChart data={countyData} height={175} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
