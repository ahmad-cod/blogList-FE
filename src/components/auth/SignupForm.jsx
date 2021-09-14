import React from 'react'
import PropTypes from 'prop-types'

const SignupForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <>
      <h2>Signup</h2>
      <form className="SignupForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleUsernameChange}
        />
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
        <button type="submit" id="signup-button">Signup</button>
      </form>
    </>
  )
}

SignupForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignupForm