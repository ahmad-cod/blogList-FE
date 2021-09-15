import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import { signup } from '../../services/auth'
import { setUser } from '../../reducers/loginUserReducer'
import { addUser } from '../../reducers/usersReducer'

const SignupForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!username || !password || !name) return
    try {
      const user = await signup({ name, username, password })
      // console.log(user)
      dispatch(setUser(user))
      dispatch(addUser(user))
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
    <>
      <h2>Signup</h2>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username-signup"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password-signup"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" id="signup-button">Signup</button>
      </form>
    </>
  )
}

export default SignupForm