import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

let Random0to5 = () => {
  let randomNum = Math.floor(Math.random() * 6)
  return randomNum
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const setValue = newValue => {
    setSelected(newValue)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br></br>
      {console.log(Random0to5)}
      <Button handleClick={() => setValue(Random0to5)} text="next anecdote"/>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'))