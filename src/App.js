import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('form submitted')
    try {
      console.log('entered try')
      const user = await loginService({ username, password })
      console.log('entered try6')

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <form className="login" onSubmit={handleLogin}>
          <label htmlFor="username">Username: </label>
          <input 
          type="text"
          name="username"
          value={username}
          onChange={( {target}) => setUsername(target.value) }
          />
          <label htmlFor="password">Password: </label>
          <input 
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">Login</button>
      </form>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default App