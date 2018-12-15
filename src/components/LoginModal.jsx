import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { sendMutation } from '../lib/api'
import '../style/LoginModal.sass'
import { SessionContext } from '../SessionContext'

const LOG_IN = gql`
  mutation LogIn( $email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      name
      email
      auth_token
    }
  }
`

const LoginModal = (props) => {


  return (
  <SessionContext.Consumer>
    {({auth_token, setSessionState}) => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

      const LogIn = () => {
        sendMutation({
          mutation: LOG_IN,
          variables: {email, password}
        }).then(res => {
          debugger
          //
          // setSessionState({auth_token})
        })
      }

      return <div className={`modal ${props.active ? '' : 'modal--inactive'}`}>
        <input
          className="modal__item c__input"
          type="text" value={email}
          onChange={e => setEmail(e.target.value)}/>
        <input
          className="modal__item c__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <div className="modal__item modal__button" onClick={LogIn}>Sign In</div>
      </div>
    }}
  </SessionContext.Consumer>

  )
}
export default LoginModal
