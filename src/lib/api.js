// import axios from 'axios'
import ServerClient from '../ServerClient'

const sendAction = (action) => {
  return ServerClient.query(action)
  .then(res => {
    return res
  })
  .catch(err => {
    debugger
  })
}

export {sendAction}
