import axios from 'axios'
const loginUrl = '/api/login'
const signupUrl = '/api/users'

export const login = async credentials => {
  try {
    const response = await axios.post(loginUrl, credentials)
    console.log('entered login')
    // console.log(response.data)
    return response.data
  }
  catch (exception) {
    console.log(exception)
  }
}

export const signup = async credentials => {
  try {
    const response = await axios.post(signupUrl, credentials)

    return response.data
  }
  catch (exception) {
    console.log(exception)
  }
}

export default login