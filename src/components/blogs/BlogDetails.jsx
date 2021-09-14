import React from 'react'
import { useDispatch } from 'react-redux'
import blogServices from '../../services/blogs'
import { createNotification, clearNotification } from '../../reducers/notificationReducer'
import { addComment, like } from '../../reducers/blogsReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
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
      // setUpdate(null)
    } catch (e) {
      console.log(e)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    // console.log(value)
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
    <>
      <div>
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <div>
          {blog.likes} likes
          <button onClick={handleLike}>Like</button>
        </div>
        <p>added by { blog.user && blog.user.name}</p>
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleComment}>
          <input type="text" name='comment' />
          <button>Add Comment</button>
        </form>
        <ul>
          {
            blog.comments ?
              blog.comments.map((comment, i) => <li key={i}>{comment}</li>) : null
          }
        </ul>
      </div>
    </>
  )
}

export default BlogDetails