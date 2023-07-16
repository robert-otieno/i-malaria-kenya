import React from "react";
import { SiIndeed } from "react-icons/si";
import { TiRefresh } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const Header = ({ title, nav }) => {
  return (
    <div className="flex items-center justify-between text-gray-100 font-medium text-lg">
      <SiIndeed />
      <div>{title}</div>
      <NavLink to={nav} className="text-white bg-teal-700 hover:bg-teal-900 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
        <TiRefresh className="w-8 h-8" />
        <span className="sr-only">Icon description</span>
      </NavLink>
    </div>
  );
};

export default Header;
