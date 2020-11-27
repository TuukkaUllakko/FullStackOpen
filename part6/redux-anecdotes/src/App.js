import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecoddtes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    dispatch({
      type: 'ADD_NEW',
      data: { text }
    })
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
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App