import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/index'
import ShoppingCart from '../ShoppingCart'

const NavBar = (props) => {
  const [loginModal, setLoginModal] = useState(!props.loggedIn)
  const [cartModal, setCartModal] = useState(false)

  const toggleLoginModal = () => {
    setLoginModal(!loginModal)
  }

  const toggleShoppingCart = () => {
    setCartModal(!cartModal)
  }

  const updateCartItemQty = (amount, id) => {
    const item = props.shoppingCart.find(e => e.id == id)
    props.updateCartItem({...item, amount})
  }

  const handleDropdown = e => {
    e.currentTarget.classList.toggle('active')
    e.currentTarget.querySelector('.nav__ddown-list').classList.toggle('active')
  }

  if (props.loggedIn)
    return (
      <div id="nav__bar" className='flex--row flex--between flex--align-center'>
        <div>
          <Link to='/'>
            Search
          </Link>
          <Link to='/user/orders/created'>
            Orders
          </Link>
          <Link to='/user/orders/attending'>
            Attending Orders
          </Link>
          <Link to='/user/inventory'>
            Inventory
          </Link>
        </div>
        <div className="flex--row flex--between">
          <i className="fas fa-shopping-cart icon--button" style={{marginRight: '1em'}} onClick={e => toggleShoppingCart() }></i>
          <div className="nav__ddown" onClick={handleDropdown}>
            <div className="nav__ddown-title">{props.email}</div>
            <div className="nav__ddown-list">
              <Link className="nav__ddown-li" to='/users/edit/profile'>
                Settings
              </Link>
              <Link className="nav__ddown-li nav__li--danger" to='#' onClick={ (e) => {
                e.preventDefault();
                props.logout()} }
              > Log out</Link>
            </div>
          </div>
        </div>
        <div className="modal__container">
          <div
            className={`card card--no-bg shadow--high ${cartModal ? '' : 'shrunk'}`}
            style={{background: '#fa7354'}}
          >
            <ShoppingCart />
          </div>
        </div>
      </div>
    )
  else
    return (
      <div id="nav__bar" className='flex--row flex--justify-end'>
        <div className="modal__container">
          <Login active={loginModal} />
        </div>
        <div className="nav--right">
          <i className="fas fa-user" onClick={toggleLoginModal}></i>
        </div>
      </div>
    )
}

export default NavBar
