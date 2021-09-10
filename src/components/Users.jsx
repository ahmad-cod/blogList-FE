import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return (
    <>
      <table>
        <thead>names</thead>
        <thead>blogs created</thead>
        {
          users ?
            users.map(user =>
              <tbody key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tbody>
            ) :
            <p>No user</p>
        }
      </table>
    </>
  )
}

export default Users