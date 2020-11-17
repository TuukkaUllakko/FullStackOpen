import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddedNotification from './components/AddedNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newMsg, setNewMsg] = useState(null)
  const [newErrMsg, setNewErrMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const BlogForm = () => {

    const addBlog = (event) => {
      event.preventDefault()

      blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
      })

      const message = { message: `a new blog '${newTitle}' by ${newAuthor} added`}
      setNewMsg(message)
      setTimeout(() => {
        setNewMsg(null)
      }, 3000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }

    return (
      <div>
        <h2>Create new</h2>

        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={newTitle}
              name="title"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={newAuthor}
              name="author"
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={newUrl}
              name="url"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = { message: 'wrong username or password' }
      setNewErrMsg(message)
      setTimeout(() => {
        setNewErrMsg(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>

      <AddedNotification message={newMsg}/>
      <ErrorNotification message={newErrMsg}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
          <button onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}>logout</button></p>

          {BlogForm()}

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App