import axios from 'axios'
const baseUrl = '/api/blogs'

// To store logged-in user's token
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { setToken, getAll }