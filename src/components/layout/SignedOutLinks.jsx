import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <NavLink to='/users/login' className='navlink' >Login</NavLink>
      <NavLink to='/users/signup' className='navlink' >Signup</NavLink>
    </div>
  )
}

export default SignedOutLinks