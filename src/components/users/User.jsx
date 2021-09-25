import React from 'react'
import { Tr, Td } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Tr>
      <Td><Link to={`/users/${user.id}`} >{user.name}</Link></Td>
      <Td isNumeric>{user.blogs.length}</Td>
    </Tr>
  )
}

export default User