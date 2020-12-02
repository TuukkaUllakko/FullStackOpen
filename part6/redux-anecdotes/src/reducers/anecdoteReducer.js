import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToBeUpdated = state.find(anec => anec.id === id)
      const updatedAnecdote = { ...anecdoteToBeUpdated }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote)
    }
    case 'ADD_NEW': {
      //const content = action.data.content
      return [ ...state, action.data]
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
      return state
  }

}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: newAnecdote
    })
  }
}

export const addVote = (id, anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const newAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer