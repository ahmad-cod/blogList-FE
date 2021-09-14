import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return (
    <table>
      <thead>names</thead>
      <thead>blogs created</thead>
      {
        users ?
          users.map(user =>
            <tbody key={user.id}>
              <td><Link to={`/users/${user.id}`} >{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tbody>
          ) :
          <p>No user</p>
      }
    </table>
  )
}

export default Users