import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(user => setUsers(user))
  })

  const userNames = () => {
    const usernames = users.map(user => {
      return (
        <div key={user.id}>
          {user.name}
        </div>
      )
    })
    return usernames
  }

  const countBlogs = () => {
    const blogsCount = users.map(user => {
      return (
        <div key={user.id}>
          {user.blogs.length}
        </div>
      )
    })
    return blogsCount
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td><b>Name:</b></td><td><b>Blogs created:</b></td></tr>
          <tr>
            <td>{userNames()}</td>
            <td>{countBlogs()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Users