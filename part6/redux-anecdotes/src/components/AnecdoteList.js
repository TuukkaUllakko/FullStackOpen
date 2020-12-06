import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const filteredAnecdotes = (anecdotes, filter) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toUpperCase().includes(filter.toUpperCase()))
  }


  const sortedAnecdodes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = (id, anecdote) => {
    props.addVote(id, anecdote)
    console.log(`You voted '${anecdote.content}'`)
    props.showNotif(`You voted '${anecdote.content}'`, 3)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdodes(filteredAnecdotes(props.anecdotes, props.filter)).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  showNotif
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotes