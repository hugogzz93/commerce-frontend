import cookie from 'cookie'
import { sendMutation } from '../lib/api'
import { LOG_IN_MUTATION } from '../constants/schema'

export const login = ({email, password}) => sendMutation({
    mutation: LOG_IN_MUTATION,
    variables: {email, password}
})

export const setAuthToken = token => {
  let today = new Date()
  let expires = new Date()
  expires.setTime(today.getTime() + 3600000 * 24 * 14) //14 days from now
  document.cookie = `auth_token=${token};expires=${expires.toGMTString()}`
}
