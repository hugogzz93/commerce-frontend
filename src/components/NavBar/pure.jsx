import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login/index'
import ShoppingCart from '../ShoppingCart'
import '../../style/shoppingCart.sass'

// const CartItemInput = props => {
//   const []
// }


const NavBar = (props) => {
  const [loginModal, setLoginModal] = useState(!props.loggedIn)
  const [cartModal, setCartModal] = useState(false)
  const [cartDetails, setCartDetails] = useState({})
  const [cartFetched, setCartFetched] = useState(false)

  useEffect(() => {
    if(props.shoppingCart.length)
      props.getUserProducts({ids: props.shoppingCart.map(e => e.id)})
           .then(res => setCartDetails(Object.assign({}, cartDetails, ...res.data.userProducts.map(e => ({[e.id]: e})) ))  )
           .then(() => setCartFetched(true))
  }, [props.shoppingCart])

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
      <div className="nav__bar">
        <div className="nav--left">
          <Link to='/'>
            Search
          </Link>
          <Link to='/user/orders'>
            Orders
          </Link>
        </div>
        <div className="nav--right">
          <i className="fas fa-shopping-cart icon--button" onClick={e => toggleShoppingCart() }></i>
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
        <div className={`modal ${cartModal ? 'active' : ''}`}>
          <ShoppingCart />
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
