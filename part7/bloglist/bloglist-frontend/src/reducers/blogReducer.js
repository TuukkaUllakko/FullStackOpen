import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToBeUpdated = state.find(blog => blog.id === id)
    const updatedBlog = { ...blogToBeUpdated, likes: blogToBeUpdated.likes + 1 }

    return state.map(blog =>
      blog.id !== id ? blog : updatedBlog)
  }
  case 'ADD_NEW': {
    //const content = action.data.content
    return [...state, action.data]
  }
  case 'DELETE': {
    const id = action.data
    return state.filter(blogs => blogs.id !== id)
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

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

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