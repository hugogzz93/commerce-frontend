import { sendMutation } from '../lib/api'
import { LOG_IN_MUTATION } from '../constants/schema'

export const login = ({email, password}) => sendMutation({
    mutation: LOG_IN_MUTATION,
    variables: {email, password}
  })

