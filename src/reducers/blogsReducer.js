

const blogReducer = (state = [], action) => {
  const { type, data } = action

  switch (type) {
  case 'INIT_BLOGS':
    return data
  case 'NEW_BLOG':
    return state.concat(data)
  case 'LIKE_BLOG': {
    const id = data.id
    const likedBlog = state.find(blog => blog.id === id)
    likedBlog.likes += 1

    return state.map(blog => blog.id !== id ? blog : likedBlog)
  }

  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== data.id)

  default:
    return state
  }
}

export const initializeBlogs = data => {
  return {
    type: 'INIT_BLOGS',
    data
  }
}

export const createBlog = data => {
  console.log(data)
  return {
    type: 'NEW_BLOG',
    data
  }
}

export const like = data => {
  return {
    type: 'LIKE_BLOG',
    data
  }
}

export const deleteBlog = data => {
  return {
    type: 'DELETE_BLOG',
    data
  }
}

export default blogReducer