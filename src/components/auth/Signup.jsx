import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import { signup } from '../../services/auth'
import { setUser } from '../../reducers/loginUserReducer'
import { addUser } from '../../reducers/usersReducer'
import { NavLink, useHistory } from 'react-router-dom'
import { Flex, Heading, Input, Button, Text, Link } from '@chakra-ui/react'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!username || !password || !name) return
    try {
      const user = await signup({ name, username, password })
      // console.log(user)
      dispatch(setUser(user))
      dispatch(addUser(user))
      history.push('/')
      setTimeout(() => dispatch(clearNotification()), 4000)
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      return dispatch(createNotification({ type: 'success', text: `${user.name} successfully signed in` }))
      // blogServices.setToken(user.token)
    } catch(exception) {
      console.log(exception)
      dispatch(createNotification({ text: 'Wrong Credentials', type: 'failure' }))
      setTimeout(() => dispatch(clearNotification()), 4000)
    }
  }
  return (
    <Flex height='94vh'>
      <Flex direction='column' bg='gray.300' p={12} rounded={6}>
        <Heading>Signup</Heading>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Name: </label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <label htmlFor="username">Username: </label>
          <Input
            type="text"
            name="username"
            id="signup-username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            name="password"
            id="signup-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" id="login-button" my='7px'>Signup</Button>
        </form>
        <Text>
          Already have an account ?
          <Link as={NavLink} to='/users/login' className='navlink' color='green.800'>Sign in</Link>
        </Text>
      </Flex>
    </Flex>
  )
}

export default SignupForm