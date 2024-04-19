import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FiXOctagon } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Restricted() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md flex flex-col items-center'>
          <FiXOctagon className='text-error' size={150} />
          <h1 className='text-5xl font-bold mt-7'>Restricted!</h1>
          <p className='py-6 font-medium text-xl'>Login to Continue. </p>
          <NavLink to='/login' className='flex items-center gap-5 self-center rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-400 md:text-base'>
            <span>Log in</span> <FaArrowRight className='w-5 md:w-6' />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Restricted;
