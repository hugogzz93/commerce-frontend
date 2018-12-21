import { UPDATE_USER } from '../constants/schema'
import { sendMutation } from '../lib/api'

export const updateUser = updates => (
  sendMutation({
    mutation: UPDATE_USER,
    variables: updates
  })
)
