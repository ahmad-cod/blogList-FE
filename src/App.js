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
  const [message, setMessage] = useState({})

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
      window.localStorage.setItem('blogList_Token', (user.token))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage({text: 'Wrong Credentials', type: 'failure'})
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    blogServices.setToken(user.token)
    event.preventDefault()
    const newBlog = await blogServices.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage({
      type: 'success',
      text: `a new blog ${newBlog.title} by ${newBlog.author}`
    })
    setTimeout(() => {
      setMessage({})
    }, 4000)
  }

  const notification = (!message.type) ? null : 
  <p className= {`notification ${message.type}`}>{message.text} </p>
   

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
        <div> {notification} </div>
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
             value={author}
             onChange={({ target }) => setAuthor(target.value)}
             />
            <label htmlFor="url">Url </label>
            <input
             type="url"
             name="url"
             value={url}
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