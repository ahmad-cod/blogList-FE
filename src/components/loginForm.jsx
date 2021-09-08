import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange
}) => {
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
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" id="login-button">Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm