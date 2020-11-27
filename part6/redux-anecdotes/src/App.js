import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, addVote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecoddtes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    dispatch(createAnecdote(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecoddtes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>Create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote'/></div>
        <button>Create</button>
      </form>
    </div>
  )
}

export default App