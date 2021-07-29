import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newUser) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const response = await axios.post(baseUrl, newUser, config)
  return response.data
}

// const update = async (id) => {
//   const response = await axios.put(`${baseUrl}/${id}`)
//   return response.data
// }

export default { getAll, create, setToken }