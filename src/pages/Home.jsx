import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// icons
import { RiArrowRightSFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

// local assets
import { useStateContext } from "../utils/ContextProvider";
import { Header } from "../components";

const Home = () => {
  const { countries } = useStateContext();
  const [q, setQ] = useState("");

  const search = (countries) => {
    return countries?.filter((country) => {
      return country.name.toLowerCase().includes(q.toLowerCase());
    });
  };

  return (
    <>
      <div className='bg-teal-800 p-3 space-y-2 sticky top-0'>
        <Header title='Countries' />
        <div className='relative flex items-center text-slate-600'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none group-focus-within:text-teal-500'>
            <IoSearch className='w-5 h-5' />
          </div>
          <input
            type='text'
            className='focus:ring-teal-500 focus:outline-none appearance-none w-full text-sm placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 shadow-sm'
            aria-label='Filter countries'
            placeholder='Filter countries...'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            // disabled
          />
        </div>
      </div>

      <div className=''>
        <div className='w-full text-sm font-semibold text-gray-900 bg-white dark:bg-gray-700 dark:text-white'>
          {search(countries).map((country) => (
            <NavLink
              to={`/${country.code.toLowerCase()}`}
              key={country.code}
              className='block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
            >
              <div className='flex items-center justify-between'>
                <h5 className='tracking-wide'>{country.name}</h5>
                <RiArrowRightSFill />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
