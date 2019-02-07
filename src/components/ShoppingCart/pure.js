import React, {useState, useEffect} from 'react'

const ShoppingCart = props => {
  const updateCartItemQty = (qty, id) => {
    const item = props.shoppingCart.find(e => e.id == id)
    props.updateCartItem({...item, qty})

  }

  useEffect(() => {
    props.loadCart()
  }, [props.shoppingCart.length])

  return <div className="cart__container">
      <div className="cart__items">
        { props.shoppingCart.map(item => (
          <div className="modal__item cart__item" key={item.id}>
            <div className="cart__item-title">{item.name}</div>
            <div className="cart__item-body"></div>
            <div className="cart__item-details">
              <input 
                className="cart__item-input" 
                type="number"
                value={item.qty}
                onChange={e => updateCartItemQty(e.target.value, item.id) }
              />x
              <div>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart__summary">
        {props.shoppingCart.reduce((sum, e) => sum + e.price * e.qty, 0)}
      </div>
    </div>
}

export default ShoppingCart
