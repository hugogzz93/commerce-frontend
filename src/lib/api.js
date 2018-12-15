// import axios from 'axios'
import ServerClient from '../ServerClient'

const sendQuery = (action) => {
  return ServerClient.query(action)
  .then(res => {
    return res
  })
  .catch(err => {
    debugger
  })
}

const sendMutation = (action) => {
  return ServerClient.mutate(action)
    .then(res => {
      return res
    })
    .catch(err => {
      debugger
    })
}

export {sendQuery, sendMutation}
