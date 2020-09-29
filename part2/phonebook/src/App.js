import React, { useState } from 'react'
import Filter from './components/Filter.js'
import PersForm from './components/PersForm.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      <Persons persons={persons} />
    </div>
  )

}

export default App