import React from 'react'

const Persons = ({persons, filter}) => {
    const People = persons.map(person => {
      console.log(person.name.toUpperCase())
      if (person.name.toUpperCase().includes(filter.toUpperCase()))
      {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        )
      }
      else
      {
        return (
          <div></div>
        )
      }
      })
    return (
        People
    )
}

export default Persons