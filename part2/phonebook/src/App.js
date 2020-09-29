import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let nameChecker

    persons.forEach(person => {
      if(person.name === newName)
      {
        window.alert(newName + ' is already added to the phonebook')
        nameChecker = 1
        return
      }
    })
    
    if (nameChecker !== 1)
    {
      const personObject = {
        name: newName
      }
        setPersons(persons.concat(personObject))
        setNewName('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => {
        return (
          <div key={person.name}>
            {person.name}
          </div>
        )
      })}
    </div>
  )

}

export default App