import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiIndeed } from 'react-icons/si'
import { HiMenu, HiX, HiOutlineBell } from "react-icons/hi"

import { useStateContext } from '../contexts/ContextProvider'
import { useState } from 'react'

const Footer = () => {
  const currentLink = 'bg-teal-900 text-white px-3 py-2 rounded-md text-sm font-medium'
  const defaultLink = 'text-teal-300 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

  const { countryId } = useStateContext()
  const [menuState, setMenuState] = useState(false)

  const globalLinks = [
    {
      name: 'Malaria Update',
      uri: 'update',
    },
    {
      name: 'Near Me',
      uri: 'map',
    },
    {
      name: 'Weather Forecast',
      uri: 'forecast',
    },
    {
      name: 'Emergency Contacts',
      uri: 'contact',
    },
  ]

  const localLinks = [
    {
      name: 'Malaria Update',
      uri: `${countryId}/update`,
    },
    {
      name: 'Near Me',
      uri: `${countryId}/map`,
    },
    {
      name: 'Weather Forecast',
      uri: `${countryId}/forecast`,
    },
    {
      name: 'Emergency Contacts',
      uri: `${countryId}/contact`,
    },
  ]

  return (
    <nav className='bg-teal-800 sticky bottom-0 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link to="/" className='items-center gap-2 ml-3 flex text-xl font-semibold tracking-wide text-white'>
                <SiIndeed /> <span>iMalaria</span>
              </Link>
            </div>
            <div className='hidden md:block'>
              {/* <div className='ml-10 flex items-baseline space-x-4'>
                {!countryId ? globalLinks.map((link) => (
                  <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
                )) :
                  localLinks.map((link) => (
                    <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
                  ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Footer