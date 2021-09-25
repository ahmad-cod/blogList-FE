import React from 'react'
import { useSelector } from 'react-redux'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption
} from '@chakra-ui/react'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return (
    <Table variant='striped'>
      <TableCaption>All Signed up Users.</TableCaption>
      <Thead>
        <Tr>
          <Th>Name of User</Th>
          <Th isNumeric>No. of blogs created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          users ?
            users.map(user => <User key={user.id} user={user} />) : <p>No user</p>
        }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total Users :</Th>
          <Th isNumeric>{users.length ? users.length : 0}</Th>
        </Tr>
      </Tfoot>
    </Table>
  )
}

export default Users