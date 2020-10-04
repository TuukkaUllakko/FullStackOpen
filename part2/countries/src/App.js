import React, { useState, useEffect} from 'react'
import Countries from './components/Countries'
import FilterForm from './components/FilterForm'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterOnChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return (
    <div>
      <FilterForm value={newFilter} onChange={filterOnChange}/>
      <Countries countries={countries} filter={newFilter}/>
    </div>
  )
}

export default App
