import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { RiArrowRightSFill } from "react-icons/ri";

import { useStateContext } from "../contexts/ContextProvider";
import { Header } from "../components";

const countriesData = [
  {
    name: {
      common: "Kenya",
      official: "Republic of Kenya",
      nativeName: {
        eng: {
          official: "Republic of Kenya",
          common: "Kenya",
        },
        swa: {
          official: "Republic of Kenya",
          common: "Kenya",
        },
      },
    },
    tld: [".ke"],
    cca2: "KE",
    ccn3: "404",
    cca3: "KEN",
    cioc: "KEN",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
      KES: {
        name: "Kenyan shilling",
        symbol: "Sh",
      },
    },
    idd: {
      root: "+2",
      suffixes: ["54"],
    },
    capital: ["Nairobi"],
    altSpellings: ["KE", "Republic of Kenya", "Jamhuri ya Kenya"],
    region: "Africa",
    subregion: "Eastern Africa",
    languages: {
      eng: "English",
      swa: "Swahili",
    },
    translations: {
      ara: {
        official: "جمهورية كينيا",
        common: "كينيا",
      },
      bre: {
        official: "Republik Kenya",
        common: "Kenya",
      },
      ces: {
        official: "Keňská republika",
        common: "Keňa",
      },
      cym: {
        official: "Republic of Kenya",
        common: "Kenya",
      },
      deu: {
        official: "Republik Kenia",
        common: "Kenia",
      },
      est: {
        official: "Keenia Vabariik",
        common: "Keenia",
      },
      fin: {
        official: "Kenian tasavalta",
        common: "Kenia",
      },
      fra: {
        official: "République du Kenya",
        common: "Kenya",
      },
      hrv: {
        official: "Republika Kenija",
        common: "Kenija",
      },
      hun: {
        official: "Kenyai Köztársaság",
        common: "Kenya",
      },
      ita: {
        official: "Repubblica del Kenya",
        common: "Kenya",
      },
      jpn: {
        official: "ケニア共和国",
        common: "ケニア",
      },
      kor: {
        official: "케냐 공화국",
        common: "케냐",
      },
      nld: {
        official: "Republiek Kenia",
        common: "Kenia",
      },
      per: {
        official: "جمهوری کنیا",
        common: "کنیا",
      },
      pol: {
        official: "Republika Kenii",
        common: "Kenia",
      },
      por: {
        official: "República do Quénia",
        common: "Quénia",
      },
      rus: {
        official: "Республика Кения",
        common: "Кения",
      },
      slk: {
        official: "Kenská republika",
        common: "Keňa",
      },
      spa: {
        official: "República de Kenya",
        common: "Kenia",
      },
      srp: {
        official: "Република Кенија",
        common: "Кенија",
      },
      swe: {
        official: "Republiken Kenya",
        common: "Kenya",
      },
      tur: {
        official: "Kenya Cumhuriyeti",
        common: "Kenya",
      },
      urd: {
        official: "جمہوریہ کینیا",
        common: "کینیا",
      },
      zho: {
        official: "肯尼亚共和国",
        common: "肯尼亚",
      },
    },
    latlng: [1, 38],
    landlocked: false,
    borders: ["ETH", "SOM", "SSD", "TZA", "UGA"],
    area: 580367,
    demonyms: {
      eng: {
        f: "Kenyan",
        m: "Kenyan",
      },
      fra: {
        f: "Kényane",
        m: "Kényan",
      },
    },
    flag: "🇰🇪",
    maps: {
      googleMaps: "https://goo.gl/maps/Ni9M7wcCxf8bJHLX8",
      openStreetMaps: "https://www.openstreetmap.org/relation/192798",
    },
    population: 53771300,
    gini: {
      2015: 40.8,
    },
    fifa: "KEN",
    car: {
      signs: ["EAK"],
      side: "left",
    },
    timezones: ["UTC+03:00"],
    continents: ["Africa"],
    flags: {
      png: "https://flagcdn.com/w320/ke.png",
      svg: "https://flagcdn.com/ke.svg",
      alt: "The flag of Kenya is composed of three equal horizontal bands of black, red with white top and bottom edges, and green. An emblem comprising a red, black and white Maasai shield covering two crossed white spears is superimposed at the center of the field.",
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/ke.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/ke.svg",
    },
    startOfWeek: "monday",
    capitalInfo: {
      latlng: [-1.28, 36.82],
    },
    postalCode: {
      format: "#####",
      regex: "^(\\d{5})$",
    },
  },
];

const Home = () => {
  // const { countriesData } = useStateContext();
  const [q, setQ] = useState("");

  const search = (countries) => {
    return countries?.filter((country) => {
      return country.name.toLowerCase().includes(q.toLowerCase());
    });
  };

  // Extract country name and country code from countriesData
  const countries = countriesData.map((country) => {
    const countryData = {};

    countryData.name = country.name.common;
    countryData.code = country.cca3;

    return countryData;
  });

  // Sort Countries by name
  countries.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  return (
    <>
      <div className="bg-teal-800 p-3 space-y-2 sticky top-0">
        <Header title="Countries" />
        <div className="relative flex items-center text-slate-600">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none group-focus-within:text-teal-500">
            <IoSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="focus:ring-teal-500 focus:outline-none appearance-none w-full text-sm placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            aria-label="Filter countries"
            placeholder="Filter countries..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            disabled
          />
        </div>
      </div>

      <div className="">
        <div className="w-full text-sm font-semibold text-gray-900 bg-white dark:bg-gray-700 dark:text-white">
          {countries.map((country) => (
            <NavLink
              to={`/${country.code.toLowerCase()}`}
              key={country.code}
              className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              <div className="flex items-center justify-between">
                <h5 className="tracking-wide">{country.name}</h5>
                <RiArrowRightSFill />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
