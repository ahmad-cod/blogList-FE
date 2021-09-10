

const blogReducer = (state = [], action) => {
  const { type, data } = action

  switch (type) {
  case ('INIT_BLOGS'):
    return data
  case ('NEW_BLOG'):
    return state.concat(data)
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

export default blogReducer