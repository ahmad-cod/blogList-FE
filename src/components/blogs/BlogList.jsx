import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  if(!blogs) {
    return <p>No blog</p>
  }

  return blogs.sort((a, b) => b.likes - a.likes)
    .map(blog => <Blog key={blog.id} blog={blog} user={user} />)
}

export default BlogList