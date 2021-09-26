import React, { useState } from 'react'
import { Flex, Heading, Input, Button } from '@chakra-ui/react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import login from '../../services/auth'
import { setUser } from '../../reducers/loginUserReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!username || !password) return
    try {
      const user = await login({ username, password })
      // console.log(user)
      if(!user){
        setTimeout(() => dispatch(clearNotification()), 4000)
        return dispatch(createNotification({ type: 'failure', text: 'Wrong username or password' }))
      }
      dispatch(setUser(user))
      // console.log('after')
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
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
        <Heading>Log in</Heading>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" id="login-button" my='7px'>Log in</Button>
        </form>
      </Flex>
    </Flex>
  )
}

export default LoginForm