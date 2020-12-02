import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToBeUpdated = state.find(anec => anec.id === id)
      const updatedAnecdote = { ...anecdoteToBeUpdated }
      updatedAnecdote.votes++

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

export const createAnecdote = (data) => {
  return {
    type: 'ADD_NEW',
    data
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
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