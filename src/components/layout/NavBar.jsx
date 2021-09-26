import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { Flex, Spacer, Box, Heading } from '@chakra-ui/react'

// const style = {
//   padding: 5,
//   paddingLeft: 10,
//   paddingTop: 10,
//   backgroundColor: '#eaeaea'
// }

const NavBar = ({ user }) => {
  const links = user ? <SignedInLinks user={user} /> : <SignedOutLinks />
  return (
    <Flex borderBottom='1px solid #888' p='2' alignItems='center'>
      <Box>
        <Heading size='md'> <Link to='/blogs' className='navlink'>BLOGGS</Link> </Heading>
      </Box>
      <Spacer />
      <Box>
        {links}
      </Box>
    </Flex>
  )
}

export default NavBar