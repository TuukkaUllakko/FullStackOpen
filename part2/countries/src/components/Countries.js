import React from 'react'

const Countries = ({countries, filter}) => {

    const CountryFilter = filter.length === 0
    ? countries
    : countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
    console.log(CountryFilter)

    if (CountryFilter.length === 1)
    {
        return (
            <div>
            {CountryFilter.map(country => <div key={country.name}>
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
        return (
            <div>
                {CountryFilter.map(country => <div key={country.name}>{country.name}</div>)}
            </div>
        )
    }

}

export default Countries