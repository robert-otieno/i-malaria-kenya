import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Map from './components/Map'
// import Header from './components/Header.js'

import { Header } from './components'
import { Home, Country, MalariaUpdate, Map, Contact, WeatherForecast } from './pages'


const App = () => { 

  return (
    <div className='min-h-full'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:countryId" element={<Country />} />
          {/* Pages */}
          <Route path="/update" element={<MalariaUpdate />} /> 
          <Route path="/map" element={<Map />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/forecast" element={<WeatherForecast />} /> 
        </Routes>
      </BrowserRouter>
      {/* <Map /> */}
    </div>
  )
}

export default App;