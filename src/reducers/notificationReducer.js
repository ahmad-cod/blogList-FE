
const notificationReducer = (state = {}, action) => {
  const { type, data } = action
  switch (type) {
  case 'SET_NOTIFICATION':
    return data
  case 'REMOVE_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const createNotification = data => {
  return {
    type: 'SET_NOTIFICATION',
    data
  }
}

export const clearNotification = data => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data
  }
}

export default notificationReducer