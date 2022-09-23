import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useStateContext } from '../contexts/ContextProvider'

const Country = () => {
  const { countryId } = useParams()
  const { countriesData, setCountryId } = useStateContext()

  const countryDetails = (countriesData, countryId) => {
    return countriesData?.find((country) => {
      return country.cca3.toLowerCase() === countryId
    })
  }

  useEffect(() => {
    setCountryId(countryId)
  }, [])
  

  const country = countryDetails(countriesData, countryId)

  return (
    <div className="flex gap-10 flex-wrap justify-center">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
        {/* <Map coords={country.latlng} /> */}
      </div>
    </div>
  )
}

export default Country