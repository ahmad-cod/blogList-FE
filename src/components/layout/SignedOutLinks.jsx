import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const SignedOutLinks = () => {
  return (
    <div>
      {/* <Button colorScheme='teal' mr='4'>
        <NavLink to='/users/login' className='navlink' >Sign in</NavLink>
      </Button> */}
      <Button colorScheme='teal' size='md' mr='4'>
        <NavLink to='/signup' className='navlink' >Get Started</NavLink>
      </Button>
    </div>
  )
}

export default SignedOutLinks