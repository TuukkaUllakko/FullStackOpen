import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  /*case 'VOTE': { //For next exercise
    const id = action.data.id
    const anecdoteToBeUpdated = state.find(anec => anec.id === id)
    const updatedAnecdote = { ...anecdoteToBeUpdated }

    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : updatedAnecdote)
  }*/
  case 'ADD_NEW': {
    //const content = action.data.content
    return [...state, action.data]
  }
  case 'INIT_BLOGS': {
    return action.data
  }
  default:
    return state
  }

}

export const addNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD_NEW',
      data: newBlog
    })
  }
}

//Will probably need this for the next exercise
/*export const addVote = (id, anecdote) => {
  return async dispatch => {
    anecdote.votes++
    const newAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}*/

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer