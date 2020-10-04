import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = ({countries, filter, setNewFilter}) => {

    const CountryFilter = filter.length === 0
    ? countries
    : countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

    if (CountryFilter.length > 10)
    {
        return <div>Too many matches, specify another filter</div>
    }

    else if (CountryFilter.length === 1)
    {
      const API_KEY = process.env.REACT_APP_API_KEY;

        return (
          <div>
            <div>
            {CountryFilter
            .map(country =><div key={country.name}>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <img src={country.flag} alt="flag of searched country"
                width="200px"/>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>
                        {language.name}
                    </li>)}
                </ul>
              </div>)}
            </div>
            <div>
              <Weather city={CountryFilter.name} API_KEY={API_KEY}/>
            </div>
          </div>
        )
    }
    else
    {
        const onClickShow = (name) => {
            setNewFilter(name)
          }

        return (
            
            CountryFilter
              .map(country => {
                return (
                  <div key={country.name}>
                    {country.name}
                    <button onClick={() => onClickShow(country.name)}>show</button>
                  </div>
                )
              })
          )
    }

}

const Weather = ({city, API_KEY}) => {
  let [dataOfCity, setDataOfCity] = useState({})

  useEffect(() => {
    axios
    .get()
    .then(response => {
      setDataOfCity(response.data)
    })
  }, [city, API_KEY])

  return (
    <div>

    </div>
  )
}

export default Countries