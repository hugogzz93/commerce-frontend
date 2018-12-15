import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { sendMutation } from '../lib/api'
import '../style/LoginModal.sass'
import { connect } from 'react-redux'
import { updateSession } from '../lib/actions'

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
  const [email, setEmail] = useState(props.session.email)
  const [password, setPassword] = useState('')

  const HandleLogIn = () => {
    sendMutation({
      mutation: LOG_IN,
      variables: { email, password }
    }).then(res => {
      props.dispatch(updateSession(res.data.login))
    })
  }

  const body = props.session.auth_token ?
    <div class="modal__item modal__button">{props.session.email}</div>
    : (
      <React.Fragment>
        <input
          className="modal__item c__input"
          type="text" value={email}
          onChange={e => setEmail(e.target.value)}/>
        <input
          className="modal__item c__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <div className="modal__item modal__button" onClick={HandleLogIn}>Sign In</div>
      </React.Fragment>
    )

  return (
    <div className={`modal ${props.active ? '' : 'modal--inactive'}`}>
      {body}
    </div>
  )
}

export default connect((state) => ({
  session: state.sessionReducer
}))(LoginModal)

