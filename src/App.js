import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Country, MalariaUpdate, Map, Contact, WeatherForecast } from './pages'

const App = () => { 

  return (
    <div className='min-h-full'>
      <BrowserRouter>
        <Header />
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
      </BrowserRouter>
    </div>
  )
}

export default App;