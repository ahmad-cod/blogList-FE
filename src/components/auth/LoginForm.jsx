import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import login from '../../services/login'
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
      console.log(user)
      if(!user){
        setTimeout(() => dispatch(clearNotification()), 4000)
        return dispatch(createNotification({ type: 'failure', text: 'Wrong username or password' }))
      }
      console.log('before')
      dispatch(setUser(user))
      console.log('after')
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      // blogServices.setToken(user.token)
    } catch(exception) {
      console.log(exception)
      dispatch(createNotification({ text: 'Wrong Credentials', type: 'failure' }))
      setTimeout(() => dispatch(clearNotification()), 4000)
    }
  }
  return (
    <>
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" id="login-button">Login</button>
      </form>
    </>
  )
}

export default LoginForm