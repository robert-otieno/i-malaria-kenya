import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5"
import { RiArrowRightSFill } from 'react-icons/ri'

import { useStateContext } from '../contexts/ContextProvider'

const Home = () => {
  const { countriesData } = useStateContext()
  const [q, setQ] = useState("")
  const [filterParam, setFilterParam] = useState(["All"])

  const search = (countries) => {
    return countries?.filter((country) => {
      if (country.region == filterParam) {
        return (
          country.name.common.toLowerCase().includes(q.toLowerCase())
        )
      } else if (filterParam == "All") {
        return (
          country.name.common.toLowerCase().includes(q.toLowerCase())
        )
      }
    })
  }

  return (
    <>
      <div className='h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto p-4 max-w-6xl mx-auto scrollbar-hide'>
        {/* <div className='space-y-4 md:flex md:space-y-0 md:space-x-4 text-slate-600'>
          <form className="relative md:w-1/2">
            <IoSearch className="absolute w-5 h-5 left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-teal-500"/>
            <input className="focus:ring-teal-500 focus:outline-none appearance-none w-full text-sm placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter countries" placeholder="Filter countries..." value={q} onChange={(e) => setQ(e.target.value)} />
            <span className="sr-only">Filter countries here</span>
          </form>

          <select onChange={(e) => { setFilterParam(e.target.value) }} className="block w-full md:w-1/2 rounded-md ring-1 ring-slate-200 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-teal-500 sm:text-sm" aria-label="Filter Countries By Region">
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div> */}

        <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {search(countriesData).map((country) => (
            <NavLink to={`/${country.cca3.toLowerCase()}`} key={country.cca3} className='block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'>
              <div className="flex items-center justify-between">
                <h5 className="">{country.name.common}</h5>
                <RiArrowRightSFill />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home