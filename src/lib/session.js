import { sendQuery } from './api'
import  gql from 'graphql-tag'

const LOG_IN = gql`
  mutation Login($email: String!, $password: String!)  {
    login($name, $password) {
      auth_key
    }
  }
`
export default class Session {

  constructor() {
    this.auth_key = null
  }

  async login({email, password}) {
    return sendQuery({
      query: LOG_IN,
      variables: {email, password}
    }).then(res => {
    })
  }
}
