import React from 'react'

const NavBar = (props) => {

  return (
    <div className="nav__bar">
      <div className="nav--right">
        <i className="fas fa-user" onClick={props.loginIconHandler}></i>
        <span>{props.user.email}</span>
      </div>
    </div>
  )
}

export default NavBar
