import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote =>
      anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
  })


  const sortedAnecdodes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id, anecdote) => {
    dispatch(addVote(id, anecdote))
    console.log(`You voted '${anecdote.content}'`)
    dispatch(showNotif(`You voted '${anecdote.content}'`, 3))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdodes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>Vote</button>
          </div>
        </div>)}
    </div>
  )
}

export default AnecdoteList