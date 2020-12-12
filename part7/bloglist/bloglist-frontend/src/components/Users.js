import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import UserBlogs from './UserBlogs'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(user => setUsers(user))
  })

  /*const userNames = () => { //Different way cause can't get these to work
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
  }*/

  return (
    <Router>
      <Switch>

        <Route path='/users/:id'>
          <UserBlogs users={users} />
        </Route>

        <Route path='/'>
          <div>
            <h2>Users</h2>
            <table>
              <tbody>
                <tr><td><b>Name:</b></td><td><b>Blogs created:</b></td></tr>
                {users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Route>

      </Switch>
    </Router>
  )
}

export default Users