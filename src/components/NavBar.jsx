import React from 'react'

const NavBar = (props) => {

  return (
    <div className="nav__bar">
      <div className="nav--left">
        <i className="fas fa-user" onClick={props.loginIconHandler}></i>
      </div>
    </div>
  )
}

export default NavBar
