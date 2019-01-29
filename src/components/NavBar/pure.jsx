import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/index'

const NavBar = (props) => {
  const [loginModal, setLoginModal] = useState(!props.loggedIn)

  const toggleLoginModal = () => {
    setLoginModal(!loginModal)
  }

  const handleDropdown = e => {
    e.currentTarget.classList.toggle('active')
    e.currentTarget.querySelector('.nav__ddown-list').classList.toggle('active')
  }

  if (props.loggedIn)
    return (
      <div className="nav__bar">
        <div className="nav--left">
          <Link to='/'>
            Search
          </Link>
        </div>
        <div className="nav--right">
          <div className="nav__ddown" onClick={handleDropdown}>
            <div className="nav__ddown-title">{props.email}</div>
            <div className="nav__ddown-list">
              <Link className="nav__ddown-li" to='/users/profile/edit'>
                Settings
              </Link>
              <Link className="nav__ddown-li nav__li--danger" to='#' onClick={ (e) => {
                e.preventDefault();
                props.logout()} }
              > Log out</Link>
            </div>
          </div>
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
