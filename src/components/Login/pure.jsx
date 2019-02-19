import React, { useState, useEffect } from 'react'
import '../../style/login.sass'

export default (props) => {
  const [email, setEmail] = useState(props.email || '')
  const [password, setPassword] = useState('')


  const body = props.auth_token ?
    <div className="modal__item modal__button">{props.email}</div>
    : (
      <React.Fragment>
        <form id="login-form">
          <input
            className="modal__item login__input c__input"
            type="text" 
            value={email}
            onChange={e => setEmail(e.target.value)}/>
          <input
            className="modal__item login__input c__input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          { props.login_failed && <span className='modal__item modal--text'>* Wrong username or password</span> }
          <div 
            className="modal__item modal__button" 
            onClick={() => props.login(email, password)}>
              Sign In
          </div>
        </form>
      </React.Fragment>
    )

  return (
    <div className={`modal ${props.active ? 'active' : ''}`}>
      {body}
    </div>
  )
}
