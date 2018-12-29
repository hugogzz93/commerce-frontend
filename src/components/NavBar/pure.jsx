import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/index'

const NavBar = (props) => {
  const [loginModal, setLoginModal] = useState(!props.loggedIn)

  const toggleLoginModal = () => {
    setLoginModal(!loginModal)
  }

  if (props.loggedIn)
    return (
      <div className="nav__bar">
        <div className="nav--left">
          <Link to='/'>
            Search
          </Link>
          <Link to='/users/profile/edit'>
            User
          </Link>
        </div>
        <div className="nav--right">
          <span>{props.email}</span>
        </div>
      </div>
    )
  else
    return (
      <div className="nav__bar">
        <Login active={loginModal} />
        <div className="nav--right">
          <i className="fas fa-user" onClick={toggleLoginModal}></i>
        </div>
      </div>
    )
}

export default NavBar
