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
            {CountryFilter
            .map(country =><div key={country.name}>
                <h1>{country.name}</h1>
                <p><b>Capital:</b> {country.capital}</p>
                <p><b>Population:</b> {country.population}</p>
                <img src={country.flag} alt="flag of searched country"
                width="200px"/>
                <h2>Spoken languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>
                        {language.name}
                    </li>)}
                </ul>
                    <h2>Weather in {country.capital}</h2>
                <Weather city={country.capital.toLowerCase()} API_KEY={API_KEY}/>
              </div>)}
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
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => {
      setDataOfCity(response.data)
    })
  }, [city, API_KEY])

  return (
    //Math.round(dataOfCity.main.temp - 273.15)
    <div>
      <div>
        {dataOfCity.cod === 200
        ?
        <div>
          <div><b>Temperature:</b> {Math.round(dataOfCity.main.temp - 273.15)} &deg; celcius</div>
          <div><b>Weather:</b> {dataOfCity.weather[0].description}</div>
          <img src={`http://openweathermap.org/img/wn/${dataOfCity.weather[0].icon}@2x.png`} alt="Wheather Icon" />
          <div><b>Humidity: </b> {dataOfCity.main.humidity}%</div>
          <div><b>Wind:</b> {dataOfCity.wind.speed} m/s</div>
        </div>
        : null}
      </div>
    </div>
  )
}

export default Countries