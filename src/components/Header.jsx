import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiIndeed } from 'react-icons/si'
import { HiMenu, HiX, HiOutlineBell } from "react-icons/hi"

import { useStateContext } from '../contexts/ContextProvider'
import { useState } from 'react'

const Header = () => {
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
    <nav className='bg-teal-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link to="/" className='items-center gap-2 ml-3 flex text-xl font-semibold tracking-wide text-white'>
                <SiIndeed /> <span>iMalaria</span>
              </Link>
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {!countryId ? globalLinks.map((link) => (
                  <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
                )) :
                  localLinks.map((link) => (
                    <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
                  ))}
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              <button type='button' className='bg-teal-800 p-1 rounded-full text-teal-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white'>
                <span className='sr-only'>View notifications</span>
                <HiOutlineBell className='h-6 w-6' />
              </button>

              {/* <!-- Profile dropdown --> */}
              {/* <div className='ml-3 relative'>
                <div>
                  <button type='button' className='max-w-xs bg-teal-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white' id='user-menu-button' aria-expanded='false' aria-haspopup='false'>
                    <span className='sr-only'>Open user menu</span>
                    <img className='h-8 w-8 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
                  </button>
                </div>
                <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button' tabindex='-1'> */}
                  {/* <!-- Active: 'bg-teal-100', Not Active: '' --> */}
                  {/* <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-0'>Your Profile</a>
                  <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-1'>Settings</a>
                  <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-2'>Sign out</a>
                </div>
              </div> */}
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            {/* <!-- Mobile menu button --> */}
            <button type='button' className='bg-teal-800 inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white' aria-controls='mobile-menu' aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              <HiMenu className={`${menuState ? 'hidden' : 'block'} h-6 w-6`} onClick={() => setMenuState(!menuState)} />
              <HiX className={`${!menuState ? 'hidden' : 'block'} h-6 w-6`} onClick={() => setMenuState(!menuState)} />
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {menuState && (
        <div className='md:hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col'>
            {!countryId ? globalLinks.map((link) => (
              <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
            )) :
              localLinks.map((link) => (
                <NavLink to={`/${link.uri}`} style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? currentLink : defaultLink} >{link.name}</NavLink>
              ))}
          </div>

          {/* <div className='pt-4 pb-3 border-t border-teal-700'>
            <div className='flex items-center px-5'>
              <div className='flex-shrink-0'>
                <img className='h-10 w-10 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
              </div>
              <div className='ml-3'>
                <div className='text-base font-medium leading-none text-white'>Joy Mwamsidu</div>
                <div className='text-sm font-medium leading-none text-teal-400'>joy.mwamsidu@edu.com</div>
              </div>
              <button type='button' className='ml-auto bg-teal-800 flex-shrink-0 p-1 rounded-full text-teal-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white'>
                <span className='sr-only'>View notifications</span>
                <HiOutlineBell className='h-6 w-6' />
              </button>
            </div>
            <div className='mt-3 px-2 space-y-1'>
              <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Your Profile</a>
              <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Settings</a>
              <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Sign out</a>
            </div>
          </div> */}
        </div>
      )}
    </nav>
  )
}

export default Header