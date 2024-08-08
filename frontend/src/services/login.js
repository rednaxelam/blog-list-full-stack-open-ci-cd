import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (user) => {
  try {
    const result = await axios.post(baseUrl, user)
    return result.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default { logIn }