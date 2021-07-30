import React from 'react'

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
              value={username}
              onChange={handleUsernameChange}
              />
              <label htmlFor="password">Password: </label>
              <input 
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              />
              <button type="submit">Login</button>
          </form>
        </> 
    )
}

export default LoginForm