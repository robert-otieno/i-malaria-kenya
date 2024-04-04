import { FaMosquito, FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import desktopImg from "../assets/desktop.jpeg";
import mobile from "../assets/mobile.jpeg";

export const LandingPage = () => {
  return (
    <main className='flex h-screen flex-col p-6'>
      <div className='flex shrink-0 rounded-lg bg-teal-800 gap-3 p-4 items-center'>
        <FaMosquito color='#fff' size={32} /> <div className='text-gray-100 font-medium font-serif text-lg p-1 tracking-wide'>iMalaria</div>
      </div>

      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20'>
          <p className={` font-serif font-medium text-2xl text-gray-800 md:leading-normal`}>A malaria early warning alert system for health officials</p>
          <NavLink to='/login' className='flex items-center gap-5 self-start rounded-lg bg-teal-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-400 md:text-base'>
            <span>Log in</span> <FaArrowRight className='w-5 md:w-6' />
          </NavLink>
        </div>

        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          {/* Add Hero Images Here */}
          <div className='hidden md:block'>
            <div className='mockup-browser border bg-base-300'>
              <div className='mockup-browser-toolbar'>
                <div className='input'>https://i-malaria-kenya.vercel.app/</div>
              </div>
              <div className='flex justify-center bg-base-200'>
                <img src={desktopImg} className='hidden md:block max-w-3xl' alt='Screenshots of the dashboard project showing desktop version' />
              </div>
            </div>
          </div>
          <div className='block md:hidden'>
            <div className='mockup-phone'>
              <div className='camera'></div>
              <div className='display'>
                <div className='artboard artboard-demo phone-1'>
                  <img src={mobile} className='block md:hidden' alt='Screenshots of the dashboard project showing mobile version' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
