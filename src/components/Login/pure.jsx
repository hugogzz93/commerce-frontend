import React, { useState, useEffect } from 'react'

export default (props) => {
  const user = props.user
  const [email, setEmail] = useState(user.email || '')
  const [password, setPassword] = useState('')


  const body = props.user.auth_token ?
    <div className="modal__item modal__button">{props.user.email}</div>
    : (
      <React.Fragment>
        <input
          className="modal__item c__input"
          type="text" 
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        <input
          className="modal__item c__input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <div 
          className="modal__item modal__button" 
          onClick={() => props.login(email, password)}>
            Sign In
        </div>
      </React.Fragment>
    )

  return (
    <div className={`modal ${props.active ? '' : 'modal--inactive'}`}>
      {body}
    </div>
  )
}
