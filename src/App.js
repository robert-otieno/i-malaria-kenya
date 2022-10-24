import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from './components'
import { Home, Country, MalariaUpdate, Map, Contact, WeatherForecast } from './pages'

const App = () => { 

  return (
    <div className='relative min-h-full max-w-sm mx-auto border border-teal-600'>
      <BrowserRouter>
        <Routes>
          {/* Global */}
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<MalariaUpdate />} /> 
          <Route path="/map" element={<Map />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/forecast" element={<WeatherForecast />} /> 
          {/* Local */}
          <Route path="/:countryId" element={<Country />} />
          <Route path="/:countryId/update" element={<MalariaUpdate />} /> 
          <Route path="/:countryId/map" element={<Map />} /> 
          <Route path="/:countryId/contact" element={<Contact />} /> 
          <Route path="/:countryId/forecast" element={<WeatherForecast />} /> 

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;