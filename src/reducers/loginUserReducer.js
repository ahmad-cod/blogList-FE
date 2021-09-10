
const userReducer = (state = null, action) => {
  const { type, data } = action
  switch (type) {
  case 'SET_USER':
    return data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const setUser = data => {
  return {
    type: 'SET_USER',
    data
  }
}

export const removeUser = {
  type: 'REMOVE_USER'
}

export default userReducer