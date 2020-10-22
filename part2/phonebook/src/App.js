import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersForm from './components/PersForm.js'
import Persons from './components/Persons.js'
import phoneService from './services/persons'
import AddedNotification from './components/AddedNotification.js'
import ErrorNotification from './components/ErrorNotification.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMsg, setNewMsg] = useState(null)
  const [newErrMsg, setNewErrmsg] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person =>
      person.name)
      .includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let getID = persons.find(item => item.name === newName)
        let id = getID.id
        phoneService
          .update(id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {

            const message = { message: `${error.response.data.error}` }

            setNewErrmsg(message)
            setTimeout(() => {
              setNewErrmsg(null)
            }, 5000)
          })
      }
    }
    else {
      phoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")

          const message = {
            message: `Added ${personObject.name}`,
          }
          setNewMsg(message)
          setTimeout(() => {
            setNewMsg(null)
          }, 5000)
        })
        .catch(error => {

          const message = {
            message: `${error.response.data.error}`,
          }
          setNewErrmsg(message)
          setTimeout(() => {
            setNewErrmsg(null)
          }, 5000)
        })
    }
  }

  const deleteEntry = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);
    let indexOfEntry = persons.map(person => person.id).indexOf(id)
    if (result) {
      phoneService
        .deletePerson(id)
        .then()
      const personsCopy = [...persons]
      personsCopy.splice(indexOfEntry, 1)
      setPersons(personsCopy)
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

      <AddedNotification message={newMsg} />
      <ErrorNotification message={newErrMsg} />

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
      <Persons persons={persons} filter={newFilter} onClick={deleteEntry} />
    </div>
  )

}

export default App