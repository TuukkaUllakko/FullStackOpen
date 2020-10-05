import React from 'react'

const Persons = ({persons, filter, onClick}) => {

    const personFilter = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    console.log(personFilter)

    return (
      <div>
        {personFilter.map(person => <div key={person.id}>{person.name} {person.number}
        <button onClick={() => onClick(person.id, person.name)}>delete</button></div>)}
      </div>
    )
}

export default Persons