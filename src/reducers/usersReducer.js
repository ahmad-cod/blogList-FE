
const usersReducer = (state = [], action) => {
  const { type, data } = action
  switch (type) {
  case 'INIT_USERS':
    return data
  case 'NEW_USER':
    return state.concat(data)
  default:
    return state
  }
}

export const initializeUsers = data => {
  return {
    type: 'INIT_USERS',
    data
  }
}

export const addUser = data => {
  return {
    type: 'NEW_USER',
    data
  }
}

export const removeUser = {
  type: 'REMOVE_USER'
}

export default usersReducer