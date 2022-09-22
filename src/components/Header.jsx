import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SiIndeed } from 'react-icons/si'

const Header = () => {
  const activeLink = 'bg-teal-700 text-white px-3 py-2 rounded-md text-sm font-medium';
  const normalLink = 'text-teal-300 hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
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
                <NavLink to='/update' style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? activeLink : normalLink} >
                  <span className="capitalize">Malaria Update</span>
                </NavLink>

                <NavLink to='/map' style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? activeLink : normalLink} >
                  <span className="capitalize">Near Me</span>
                </NavLink>

                <NavLink to='/forecast' style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? activeLink : normalLink} >
                  <span className="capitalize">Weather Forecast</span>
                </NavLink>

                <NavLink to='/contact' style={({ isActive }) => ({ backgroundColor: isActive })} className={({ isActive }) => isActive ? activeLink : normalLink} >
                  <span className="capitalize">Emergency Contacts</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              <button type='button' className='bg-teal-800 p-1 rounded-full text-teal-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white'>
                <span className='sr-only'>View notifications</span>
                {/* <!-- Heroicon name: outline/bell --> */}
                <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className='ml-3 relative'>
                <div>
                  <button type='button' className='max-w-xs bg-teal-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white' id='user-menu-button' aria-expanded='false' aria-haspopup='false'>
                    <span className='sr-only'>Open user menu</span>
                    <img className='h-8 w-8 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
                  </button>
                </div>

                {/* <!--
                Dropdown menu, show/hide based on menu state.

                Entering: 'transition ease-out duration-100'
                  From: 'transform opacity-0 scale-95'
                  To: 'transform opacity-100 scale-100'
                Leaving: 'transition ease-in duration-75'
                  From: 'transform opacity-100 scale-100'
                  To: 'transform opacity-0 scale-95'
              --> */}
                {/* <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='user-menu-button' tabindex='-1'> */}
                {/* <!-- Active: 'bg-teal-100', Not Active: '' --> */}
                {/* <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-0'>Your Profile</a>

                  <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-1'>Settings</a>

                  <a href='#' className='block px-4 py-2 text-sm text-teal-700' role='menuitem' tabindex='-1' id='user-menu-item-2'>Sign out</a>
                </div> */}
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            {/* <!-- Mobile menu button --> */}
            <button type='button' className='bg-teal-800 inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white' aria-controls='mobile-menu' aria-expanded='false'>
              <span className='sr-only'>Open main menu</span>
              {/* <!--
              Heroicon name: outline/menu

              Menu open: 'hidden', Menu closed: 'block'
            --> */}
              <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              {/* <!--
              Heroicon name: outline/x

              Menu open: 'block', Menu closed: 'hidden'
            --> */}
              <svg className='hidden h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='md:hidden' id='mobile-menu'>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          {/* <!-- Current: 'bg-teal-900 text-white', Default: 'text-teal-300 hover:bg-teal-700 hover:text-white' --> */}
          <a href='/' className='bg-teal-900 text-white block px-3 py-2 rounded-md text-base font-medium' aria-current='page'>I-Malaria</a>

          <a href='/' className='text-teal-300 hover:bg-teal-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>Malaria Update</a>

          <a href='/' className='text-teal-300 hover:bg-teal-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>Near Me</a>

          <a href='/' className='text-teal-300 hover:bg-teal-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>Weather Forecast</a>

          <a href='/' className='text-teal-300 hover:bg-teal-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'>Emergency Contacts</a>
        </div>
        <div className='pt-4 pb-3 border-t border-teal-700'>
          <div className='flex items-center px-5'>
            <div className='flex-shrink-0'>
              <img className='h-10 w-10 rounded-full' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='' />
            </div>
            <div className='ml-3'>
              <div className='text-base font-medium leading-none text-white'>Tom Cook</div>
              <div className='text-sm font-medium leading-none text-teal-400'>tom@example.com</div>
            </div>
            <button type='button' className='ml-auto bg-teal-800 flex-shrink-0 p-1 rounded-full text-teal-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white'>
              <span className='sr-only'>View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
              </svg>
            </button>
          </div>
          {/* <div className='mt-3 px-2 space-y-1'>
                <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Your Profile</a>

                <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Settings</a>

                <a href='#' className='block px-3 py-2 rounded-md text-base font-medium text-teal-400 hover:text-white hover:bg-teal-700'>Sign out</a>
            </div> */}
        </div>
      </div>
    </nav>
  )
}

export default Header