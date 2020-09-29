import React from 'react'

const Persons = ({persons}) => {
    const Persons = persons.map(person => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        )
      })
    return (
        Persons
    )
}

export default Persons