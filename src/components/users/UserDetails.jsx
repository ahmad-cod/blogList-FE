import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const UserDetails = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  if(!users.length) return <p>Loading...</p>
  const user = users.find(user => user.id === id)
  console.log(users, 'users')
  console.log(user, 'user')
  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      { user.blogs ?
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li> )}
        </ul>
        : <p>No blog added yet</p>
      }
    </>
  )
}

export default UserDetails