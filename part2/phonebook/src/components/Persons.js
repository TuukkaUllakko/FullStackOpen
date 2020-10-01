import React from 'react'

const Persons = ({persons, filter}) => {

    const personFilter = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    console.log(personFilter)

    return (
      <div>
        {personFilter.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    )
}

export default Persons