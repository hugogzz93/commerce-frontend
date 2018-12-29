import { UPDATE_USER } from '../constants/schema'
import { sendMutation, sendQuery } from '../lib/api'

export const updateUser = updates => sendMutation({
  mutation: UPDATE_USER,
  variables: updates
})

export const queryUser = query => sendQuery(query)
