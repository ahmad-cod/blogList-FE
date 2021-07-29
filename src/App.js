import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogListUser')
    if(loggedInUser){
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    blogServices.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('form submitted')
    try {
      const user = await loginService({ username, password })

      setUser(user)
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogServices.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
  }

  if(user === null || !user){
  return (
    <>
      <h2>Login to application</h2>
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
      </>
   )
  } 
  return(
      <div>
        <h2>Blogs</h2>
        <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
        <div>
          <h3>Create new Blog List</h3>
          <form onSubmit={addBlog}>
            <label htmlFor="title">Title: </label>
            <input
             type="text"
             name="title"
             value={title}
             onChange={({ target }) => setTitle(target.value)}
             />
            <label htmlFor="author">Author </label>
            <input
             type="text"
             name="author"
             onChange={({ target }) => setAuthor(target.value)}
             />
            <label htmlFor="url">Url </label>
            <input
             type="url"
             name="url"
             onChange={({ target }) => setUrl(target.value)}
             />
            <button type="submit">Create</button>
          </form>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App