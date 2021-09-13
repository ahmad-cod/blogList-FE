import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogServices from '../services/blogs'
import { createBlog } from '../reducers/blogsReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const BlogForm = ({ user, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    blogServices.setToken(user.token)
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogServices.create({ title, author, url })
    dispatch(createBlog(newBlog))
    console.log(newBlog, 'newBlog')
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createNotification({
      type: 'success',
      text: `a new blog ${newBlog.title} by ${newBlog.author}`
    }))
    setTimeout(() => dispatch(clearNotification()), 4000)
  }

  return (
    <>
      <h3>Create a new Blog List</h3>
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
    </>
  )
}

export default BlogForm