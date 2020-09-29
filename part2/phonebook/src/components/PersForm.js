import React from 'react'

const PersForm = (props) => {
    return (
        <form onSubmit = {props.onSubmit}>
        <div>name: <input value={props.newName} onChange={props.nameOnChange}/></div>
        <div>number: <input value={props.newNumber} onChange={props.numberOnChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersForm