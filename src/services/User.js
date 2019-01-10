import { sendMutation, sendQuery } from '../lib/api'

export const mutateUser = payload => sendMutation(payload)
export const queryUser = query => sendQuery(query)

