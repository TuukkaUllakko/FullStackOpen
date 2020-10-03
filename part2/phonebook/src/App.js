import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersForm from './components/PersForm.js'
import Persons from './components/Persons.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    let nameChecker

    persons.forEach(person => {
      if (person.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        nameChecker = 1
        return
      }
    })

    if (nameChecker !== 1) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersForm
        onSubmit={addPerson}
        newName={newName}
        nameOnChange={handleNameChange}
        newNumber={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App