import axios from 'axios'
import router from '../router'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import usersService from './users'
import feedbacks from './feedbacks'

const APIS_ENVS = {
  local: 'http://localhost:3000',
  production: 'https://backend-dashboard-feedbacks-ke27r570k-luckmenez.vercel.app/',
  development: ''
}

const httpClient = axios.create({
  baseURL: APIS_ENVS[process.env.NODE_ENV] ?? APIS_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYjc1OWY4LWYyMzgtNGZmOS1hZTkxLWVlMTU1ODk4MjMyOSIsImVtYWlsIjoiaWdvckBpZ29yLm1lIiwibmFtZSI6Iklnb3IgSGFsZmVsZCIsImlhdCI6MTYxMDQyNjg4OH0.88S5YLssZhC_TgotUZFDlcw5Cc3xlQTB0mqsQcQu1dY'
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false)
    return response
  },
  (error) => {
    const canThrowAnError =
      error.request.status === 0 ||
      error.request.status === 500

    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new Error(error.message)
    }
    if (error.response.status === 401) {
      setGlobalLoading(false)
      router.push({ name: 'Home' })
    }

    setGlobalLoading(false)
    return error
  })

export default {
  auth: AuthService(httpClient),
  users: usersService(httpClient),
  feedbacks: feedbacks(httpClient)
}
