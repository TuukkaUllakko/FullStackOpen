import React from 'react'

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
        return (
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

export default Countries