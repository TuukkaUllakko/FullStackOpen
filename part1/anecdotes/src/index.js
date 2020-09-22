import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {

  const emptyArray = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0)

  const [selected, setSelected] = useState(emptyArray)

  const setValue = newValue => {
    setSelected(newValue)
  }

  const RandomNum = () => {

    let randomNum = Math.floor(Math.random() * 6)

    while (randomNum === selected[0]) //To make sure an anecdote isn't shown twice in a row (so that "next anecdote" is more like what it actually says)
    {
      randomNum = Math.floor(Math.random() * 6)
    }

    const copy = [...selected]
    copy[0] = randomNum
    setSelected(copy)
  }

  const addVote = () => {
    const copy = [...selected]
    copy[selected[0] + 1]++
    console.log(copy)
    setValue(copy)
  }

  const maxVotedIndex = () => {
    const copy = [...selected]
    copy.shift()
    let maxVotesInd = copy.indexOf(Math.max(...copy))
    return maxVotesInd

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected[0]]}
      <div>has {selected[selected[0] + 1]} points.</div>
      <Button handleClick={() => addVote()} text="vote"/>
      <Button handleClick={() => RandomNum()} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[maxVotedIndex()]}</div>
      <div>has {selected[maxVotedIndex() + 1]} votes</div>
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