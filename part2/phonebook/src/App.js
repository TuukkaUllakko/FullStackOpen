import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let nameChecker

    persons.forEach(person => {
      if(person.name === newName)
      {
        window.alert(`${newName} is already added to phonebook`)
        nameChecker = 1
        return
      }
    })
    
    if (nameChecker !== 1)
    {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {persons.map(person => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        )
      })}
    </div>
  )

}

export default App