import { sendMutation, sendQuery } from '../lib/api'

export const postUserUpdates = payload => sendMutation(payload)
export const queryUser = query => sendQuery(query)
