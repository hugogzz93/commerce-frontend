import cookie from 'cookie'
import { sendMutation, sendQuery } from '../lib/api'
import { LOG_IN_MUTATION, LOG_OUT_MUTATION, LOG_IN_JWT_QUERY } from '../constants/schema'

export const login = ({email, password}) => sendMutation({
    mutation: LOG_IN_MUTATION,
    variables: {email, password}
})

export const logout = ({auth_token}) => sendMutation({
  mutation: LOG_OUT_MUTATION,
  variables: { auth_token }
})

export const loginJWT = auth_token => sendQuery({
  query: LOG_IN_JWT_QUERY,
  variables: { auth_token }
})

export const setAuthTokenCookie = token => {
  let today = new Date()
  let expires = new Date()
  expires.setTime(today.getTime() + 3600000 * 24 * 14) //14 days from now
  document.cookie = `auth_token=${token};expires=${expires.toGMTString()}`
}

export const getAuthToken = () => {
  const raw_token = document.cookie.split(';').filter(item => item.includes('auth_token='))
  return raw_token.length ? raw_token[0].split('=')[1] : null
} 
