import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogServices from '../../services/blogs'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import { addComment, like, deleteBlog } from '../../reducers/blogsReducer'
import { Input, Button, Heading, Box, Container, Text, List, ListItem, Flex, ListIcon } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { Redirect } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  if (!user) {
    console.log('No User')
    return <Redirect to='/signup'/>
  }
  if(!blog) return <p>Loading ...</p>
  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogServices.update(blog.id, updateBlog)
      dispatch(like (blog))
      dispatch(createNotification({ text: `You liked ${blog.title}`, type: 'success' }))
      setTimeout(() => dispatch(clearNotification()), 4000)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){return false}
    try {
      blogServices.setToken(user.token)
      // console.log(blog)
      await blogServices.remove(blog.id)
      dispatch(deleteBlog(blog))
      dispatch(createNotification({ type: 'success', text: `You deleted ${blog.title}` }))
      setTimeout(() => dispatch(clearNotification()))
    } catch (e) {
      console.error(e)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    console.log(comment)
    if(!comment) return
    const blogUpdate = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    console.log(comment)
    try {
      await blogServices.update(blog.id, blogUpdate)
      dispatch(addComment({ blog, comment }))
      e.target.comment.value = ''
    } catch (e) {
      console.log(e)
    }
  }
  console.log(blog.comments)
  return (
    <Container>
      <Box p={2}>
        <Heading>{blog.title}</Heading>
        <Text textDecoration='underline'>
          <a href={blog.url} className='blogUrl'>{blog.url}</a>
        </Text>
        <Flex alignItems='center' justifyContent='space-between'>
          <Text><span className='likes'>{blog.likes}</span> likes</Text>
          <Button onClick={handleLike} borderRadius='46%'>Like</Button>
        </Flex>
        <Text>added by { blog.user && blog.user.name}</Text>
      </Box>
      <Text>
        {blog.user.username === user.username ?
          <Button onClick={handleRemove}>Remove</Button> : ''
        }
      </Text>
      <Box>
        <Heading
          as='h4'
          fontSize='18px'
        >
          Comments {blog.comments.length ? `(${blog.comments.length})` : ''}
        </Heading>
        <form onSubmit={handleComment}>
          <Input type="text" name='comment' maxW='80vw' my='10px'/>
          <Button type='submit' mb='5px'>Comment</Button>
        </form>
        <List>
          {
            blog.comments ?
              blog.comments.map((comment, i) => <ListItem key={i}>
                <ListIcon as={SettingsIcon} color="green.400" />
                {comment}</ListItem>) : null
          }
        </List>
      </Box>
    </Container>
  )
}

export default BlogDetails