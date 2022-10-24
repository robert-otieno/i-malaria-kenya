import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Header } from '../components'

import { useStateContext } from '../contexts/ContextProvider'

import { BsFillInfoCircleFill } from 'react-icons/bs'
import { RiArrowRightSFill } from 'react-icons/ri'
import { TiArrowBack } from 'react-icons/ti'

const Country = () => {
  const { countryId } = useParams()
  const { countriesData, setCountryId } = useStateContext()

  const counties = [
    {
      name: 'Baringo County',
      malariaData: {
        2017: 32845,
        2018: 42135,
        2019: 40415,
        2020: 58917,
        2021: 40279,
      }
    },
    {
      name: 'Bomet County',
      malariaData: {
        2017: 3046,
        2018: 2143,
        2019: 1999,
        2020: 1925,
        2021: 2315,
      }
    },
    {
      name: 'Bungoma County',
      malariaData: {
        2017: 363062,
        2018: 300970,
        2019: 515493,
        2020: 289051,
        2021: 430707,
      }
    },
    {
      name: 'Busia County',
      malariaData: {
        2017: 319961,
        2018: 411763,
        2019: 498431,
        2020: 363954,
        2021: 400794,
      }
    },
    {
      name: 'Elgeyo Marakwet County',
      malariaData: {
        2017: 12584,
        2018: 13470,
        2019: 18755,
        2020: 28243,
        2021: 12135,
      }
    },
    {
      name: 'Embu County',
      malariaData: {
        2017: 3293,
        2018: 3657,
        2019: 1585,
        2020: 1399,
        2021: 810,
      }
    },
    {
      name: 'Garissa County',
      malariaData: {
        2017: 7560,
        2018: 8538,
        2019: 3678,
        2020: 6677,
        2021: 4428,
      }
    },
    {
      name: 'Homa Bay County',
      malariaData: {
        2017: 370575,
        2018: 228142,
        2019: 117337,
        2020: 117750,
        2021: 176755
      }
    },
    {
      name: 'Isiolo County',
      malariaData: {
        2017: 4296,
        2018: 7327,
        2019: 7254,
        2020: 5660,
        2021: 3474
      }
    },
    {
      name: 'Kajiado County',
      malariaData: {
        2017: 11848,
        2018: 9350,
        2019: 7102,
        2020: 5865,
        2021: 5685,
      }
    },
    {
      name: 'Kakamega County',
      malariaData: {
        2017: 767768,
        2018: 564537,
        2019: 869972,
        2020: 553033,
        2021: 732942,
      }
    },
    {
      name: 'Kericho County',
      malariaData: {
        2017: 25881,
        2018: 27077,
        2019: 25263,
        2020: 29096,
        2021: 25616,
      }
    },
    {
      name: 'Kiambu County',
      malariaData: {
        2017: 6005,
        2018: 5117,
        2019: 7362,
        2020: 4080,
        2021: 4429,
      }
    },
    {
      name: 'Kilifi County',
      malariaData: {
        2017: 78648,
        2018: 151250,
        2019: 154693,
        2020: 282974,
        2021: 88503,
      }
    },
    {
      name: 'Kirinyaga County',
      malariaData: {
        2017: 125,
        2018: 119,
        2019: 141,
        2020: 238,
        2021: 336,
      }
    },
    {
      name: 'Kisii County',
      malariaData: {
        2017: 81936,
        2018: 62635,
        2019: 50482,
        2020: 41680,
        2021: 48031,
      }
    },
    {
      name: 'Kisumu County',
      malariaData: {
        2017: 318711,
        2018: 360890,
        2019: 367254,
        2020: 333780,
        2021: 371901,
      }
    },
    {
      name: 'Kitui County',
      malariaData: {
        2017: 5615,
        2018: 5606,
        2019: 2875,
        2020: 5292,
        2021: 2105,
      }
    },
    {
      name: 'Kwale County',
      malariaData: {
        2017: 114955,
        2018: 245147,
        2019: 143933,
        2020: 229002,
        2021: 153562,
      }
    },
    {
      name: 'Laikipia County',
      malariaData: {
        2017: 2828,
        2018: 1999,
        2019: 1018,
        2020: 770,
        2021: 1061,
      }
    },
    {
      name: 'Lamu County',
      malariaData: {
        2017: 1227,
        2018: 1023,
        2019: 625,
        2020: 433,
        2021: 278,
      }
    },
    {
      name: 'Machakos County',
      malariaData: {
        2017: 3748,
        2018: 2994,
        2019: 3324,
        2020: 2083,
        2021: 2506,
      }
    },
    {
      name: 'Makueni County',
      malariaData: {
        2017: 1208,
        2018: 1317,
        2019: 1160,
        2020: 1257,
        2021: 1108,
      }
    },
    {
      name: 'Mandera County',
      malariaData: {
        2017: 820,
        2018: 2060,
        2019: 1670,
        2020: 1034,
        2021: 686,
      }
    },
    {
      name: 'Marsabit County',
      malariaData: {
        2017: 6908,
        2018: 3419,
        2019: 1612,
        2020: 5237,
        2021: 1681,
      }
    },
    {
      name: 'Meru County',
      malariaData: {
        2017: 18111,
        2018: 12946,
        2019: 8826,
        2020: 5888,
        2021: 4297,
      }
    },
    {
      name: 'Migori County',
      malariaData: {
        2017: 253416,
        2018: 242913,
        2019: 283080,
        2020: 263485,
        2021: 368632,
      }
    },
    {
      name: 'Mombasa County',
      malariaData: {
        2017: 58695,
        2018: 65728,
        2019: 46912,
        2020: 35594,
        2021: 22420,
      }
    },
    {
      name: 'Muranga County',
      malariaData: {
        2017: 208,
        2018: 385,
        2019: 375,
        2020: 255,
        2021: 286,
      }
    },
    {
      name: 'Nairobi County',
      malariaData: {
        2017: 48374,
        2018: 42282,
        2019: 49620,
        2020: 30394,
        2021: 31489,
      }
    },
    {
      name: 'Nakuru County',
      malariaData: {
        2017: 33549,
        2018: 25514,
        2019: 26203,
        2020: 15306,
        2021: 16780,
      }
    },
    {
      name: 'Nandi County',
      malariaData: {
        2017: 56533,
        2018: 62029,
        2019: 69575,
        2020: 39531,
        2021: 44748,
      }
    },
    {
      name: 'Narok County',
      malariaData: {
        2017: 13211,
        2018: 11457,
        2019: 16414,
        2020: 15757,
        2021: 15690,
      }
    },
    {
      name: 'Nyamira County',
      malariaData: {
        2017: 27717,
        2018: 16054,
        2019: 17442,
        2020: 16267,
        2021: 19593,
      }
    },
    {
      name: 'Nyandarua County',
      malariaData: {
        2017: 712,
        2018: 580,
        2019: 671,
        2020: 423,
        2021: 361,
      }
    },
    {
      name: 'Nyeri County',
      malariaData: {
        2017: 501,
        2018: 292,
        2019: 422,
        2020: 336,
        2021: 386,
      }
    },
    {
      name: 'Samburu County',
      malariaData: {
        2017: 5853,
        2018: 15241,
        2019: 15288,
        2020: 10719,
        2021: 6266,
      }
    },
    {
      name: 'Siaya County',
      malariaData: {
        2017: 428438,
        2018: 487887,
        2019: 616561,
        2020: 550109,
        2021: 535281,
      }
    },
    {
      name: 'Taita Taveta County',
      malariaData: {
        2017: 2265,
        2018: 2518,
        2019: 2048,
        2020: 1709,
        2021: 1565,
      }
    },
    {
      name: 'Tana River County',
      malariaData: {
        2017: 8365,
        2018: 10597,
        2019: 5126,
        2020: 7133,
        2021: 5562,
      }
    },
    {
      name: 'Tharaka Nithi County',
      malariaData: {
        2017: 8950,
        2018: 8190,
        2019: 5143,
        2020: 3392,
        2021: 2508,
      }
    },
    {
      name: 'Trans Nzoia County',
      malariaData: {
        2017: 100600,
        2018: 83607,
        2019: 96062,
        2020: 75437,
        2021: 85212,
      }
    },
    {
      name: 'Turkana County',
      malariaData: {
        2017: 193374,
        2018: 174341,
        2019: 228249,
        2020: 378346,
        2021: 301232,
      }
    },
    {
      name: 'Uasin Gishu County',
      malariaData: {
        2017: 53505,
        2018: 32490,
        2019: 32619,
        2020: 17688,
        2021: 25355,
      }
    },
    {
      name: 'Vihiga County',
      malariaData: {
        2017: 184722,
        2018: 134060,
        2019: 214624,
        2020: 135321,
        2021: 176185,
      }
    },
    {
      name: 'Wajir County',
      malariaData: {
        2017: 877,
        2018: 456,
        2019: 297,
        2020: 687,
        2021: 609,
      }
    },
    {
      name: 'West Pokot County',
      malariaData: {
        2017: 60414,
        2018: 47015,
        2019: 80417,
        2020: 93206,
        2021: 94185,
      }
    },

  ]

  const countryDetails = (countriesData, countryId) => {
    return countriesData?.find((country) => {
      return country.cca3.toLowerCase() === countryId
    })
  }

  useEffect(() => {
    setCountryId(countryId)
  }, [])

  const country = countryDetails(countriesData, countryId)
  // console.log(country.name.common)

  return (
    <>
      <div className='bg-teal-800 p-3 space-y-2 sticky top-0'>
        <Header title={country.name.common} />
      </div>
      <div className="h-screen overflow-auto scrollbar-hide">

        {countryId === 'ken' ? (
          <div className="w-full text-sm font-semibold text-gray-900 bg-white dark:bg-gray-700 dark:text-white">
            {counties.map((county, i) => (
              <div key={i} className='block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'>
                <div className="flex items-center justify-between">
                  <h5 className="tracking-wide">{county.name}</h5>
                  <RiArrowRightSFill />
                </div>
              </div>
            ))}
          </div>
        )

          : (
            <div className="p-4 m-4 border border-teal-300 rounded-lg bg-teal-50 dark:bg-teal-300" role="alert">
              <div className="flex items-center">
                <BsFillInfoCircleFill className='w-5 h-5 mr-2 animate-pulse text-blue-500' />
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium text-teal-900">Data Alert</h3>
              </div>

              <div className="mt-2 mb-4 text-sm text-teal-900">
                No Data Available at the moment
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default Country