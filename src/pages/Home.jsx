import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const Home = () => {
  const { countriesData } = useStateContext()
  const [q, setQ] = useState("")
  const [filterParam, setFilterParam] = useState(["All"])

  const search = (countries) => {
    return countries.filter((country) => {
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
    <div className='h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto p-10 max-w-6xl mx-auto scrollbar-hide'>
      <div className='space-x-4 px-3 py-2 flex'>
        <form className="relative flex-1">
          <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-teal-500" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
          </svg>
          <input className="focus:ring-teal-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter countries" placeholder="Filter countries..." value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="sr-only">Filter countries here</span>
        </form>

        <select onChange={(e) => { setFilterParam(e.target.value) }} className="block w-full rounded-md ring-1 ring-slate-200 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-teal-500 sm:text-sm flex-1" aria-label="Filter Countries By Region">
          <option value="All">Filter By Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      
      <div className="grid grid-cols-4 gap-8 mt-4">
        {search(countriesData).map((country) => (
          <NavLink to={`/${country.cca3.toLowerCase()}`} key={country.cca3} className='flex flex-col bg-white border shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
            {/* <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-36 md:rounded-none md:rounded-l-lg" src={country.flags.svg} alt="" /> */}
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{country.name.common}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{country.cca3}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Home