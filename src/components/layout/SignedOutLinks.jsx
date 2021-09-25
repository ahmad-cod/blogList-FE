import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const SignedOutLinks = () => {
  return (
    <div>
      <Button colorScheme='teal' mr='4'>
        <NavLink to='/users/login' className='navlink' >Login</NavLink>
      </Button>
      <Button colorScheme='teal' mr='4'>
        <NavLink to='/users/signup' className='navlink' >Signup</NavLink>
      </Button>
    </div>
  )
}

export default SignedOutLinks