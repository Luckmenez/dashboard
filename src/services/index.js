import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import usersService from './users'

const APIS_ENVS = {
  local: 'http://localhost:3000',
  production: '',
  development: ''
}

const httpClient = axios.create({
  baseURL: APIS_ENVS.local
})

httpClient.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const canThrowAnError =
      error.request.status === 0 ||
      error.request.status === 500
    if (canThrowAnError) throw new Error(error.message)
    if (error.response.status === 401) {
      router.push({ name: 'Home' })
    }
  })

export default {
  auth: AuthService(httpClient),
  users: usersService(httpClient)
}
