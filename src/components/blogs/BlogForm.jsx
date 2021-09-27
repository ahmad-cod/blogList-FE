import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from '../../services/blogs'
import { createBlog } from '../../reducers/blogsReducer'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import { Flex, Heading, Input, Button } from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'

const BlogForm = () => {
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  if(!user) return <Redirect to='/signup' />

  const addBlog = async (event) => {
    console.log('user', user)
    event.preventDefault()
    blogServices.setToken(user.token)
    // blogFormRef.current.toggleVisibility()
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
    <Flex direction='column' bg='gray.300' h='92vh' p={7}>
      <Heading>Add a Blog</Heading>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="author">Author </label>
        <Input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor="url">Url </label>
        <Input
          type="url"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" my='10px'>Create</Button>
      </form>
    </Flex>
  )
}

export default BlogForm