import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeUser } from '../../reducers/loginUserReducer'

const SignedInLinks = ({ user }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    dispatch(removeUser())
  }

  return (
    <div>
      <NavLink to='/blogs/create' >New Blog</NavLink>
      <NavLink to='/users' >Users</NavLink>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default SignedInLinks