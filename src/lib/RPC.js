import iziToast from 'izitoast'
import { sendQuery, sendMutation} from './api'

const normalizeError = err => {
  return {
    errorMsg: 'An error has ocurred',
    err
  }
}

const RPC = {
  sendMutation({variables, mutation, normalizer}) {
    return sendMutation({variables, mutation})
    .then(normalizer)
    .catch(normalizeError)
  },

  handleResponseStatus({
    successMsg = 'Success',
    failMsg = 'An error has ocurred',
    successFn,
    failFn,
    ensure,
   }) {
    return (res) => {
      if(res.errorMsg) {
        iziToast.error({title: failMsg || res.errorMsg, message: window.$DEBUG ? res.err.graphQLErrors : ''})
        if(failFn) failFn(res)
      } else {
        iziToast.success({title: successMsg, message: ''})
        if(successFn) successFn(res)
      }
      if(ensure) ensure()
    }
  },

}

export default RPC
