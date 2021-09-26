import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { removeUser } from '../../reducers/loginUserReducer'
import { Link, Button, Avatar } from '@chakra-ui/react'

const SignedInLinks = ({ user }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    dispatch(removeUser())
  }

  return (
    <div>
      <Link as={NavLink} to='/blogs/create' px='5px'>New Blog</Link>
      <Link as={NavLink} to='/users' px='5px' >Users</Link>
      <Avatar name={user.name} size='sm' px='8px'/>
      {/* {user.name} logged in */}
      <Button onClick={handleLogout} size='sm' px='5px'>logout</Button>
    </div>
  )
}

export default SignedInLinks