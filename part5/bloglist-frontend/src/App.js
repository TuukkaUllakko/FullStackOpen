import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddedNotification from './components/AddedNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMsg, setNewMsg] = useState(null)
  const [newErrMsg, setNewErrMsg] = useState(null)

  const blogFormRef = useRef()

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

  const addBlog = (newBlogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService.create(newBlogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))

        const message = { message: `a new blog '${newBlogObject.title}' by ${newBlogObject.author} added` }
        setNewMsg(message)
        setTimeout(() => {
          setNewMsg(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        const message = { message: `${error.response.data.error}`}
        setNewErrMsg(message)
        setTimeout(() => {
          setNewErrMsg(null)
        }, 3000)
      })
  }

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

      <AddedNotification message={newMsg} />
      <ErrorNotification message={newErrMsg} />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        /> :
        <div>
          <p>{user.name} logged in
          <button onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}>logout</button></p>

          <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App