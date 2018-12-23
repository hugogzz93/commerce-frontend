import ServerClient from '../ServerClient'

export const sendQuery = (action) => {
  return ServerClient.query(action)
  .then(res => {
    return res
  })
  .catch(err => {
    debugger
  })
}

export const sendMutation = (action) => {
  return ServerClient.mutate(action)
    .then(res => {
      return res
    })
    .catch(err => {
      // debugger
    })
}

