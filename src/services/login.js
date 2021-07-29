import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    try {
        const response = await axios.post(baseUrl, credentials)
        console.log('entered login')
        console.log(response.data)
        return response.data
    } 
    catch(exception){
        console.log(exception)
    }
}

export default login 