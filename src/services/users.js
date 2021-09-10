import axios from 'axios'
const usersUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(usersUrl)

  return response.data
}

export default { getUsers }