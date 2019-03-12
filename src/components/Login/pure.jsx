import React, { useState, useEffect } from 'react'
import Input from '../Inputs/TextInput'

export default (props) => {
  const [email, setEmail] = useState(props.email || '')
  const [password, setPassword] = useState('')

  const body = props.auth_token ?
    <div>{props.email}</div>
    : (
      <React.Fragment>
        <form className="grid-1 row-gap-15">
          <Input
            label='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input 
            label='password'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          { props.login_failed && <span>* Wrong username or password</span> }
          <div 
            className="button btn--orng-white" 
            onClick={() => props.login(email, password)}>
              Sign In
          </div>
        </form>
      </React.Fragment>
    )

  return (
    <div
      className={`card card--no-bg shadow--high ${props.active ? '' : 'shrunk'}`}
      style={{background: '#fa7354'}}
    >
      {body}
    </div>
  )
}
