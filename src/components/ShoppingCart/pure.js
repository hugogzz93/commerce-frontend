import React, {useState, useEffect} from 'react'
import numeral from 'numeral'
import Errors from '../../constants/errors'

const ShoppingCart = props => {
  const updateCartItemQty = (amount, id) => {
    const item = props.products.find(e => e.id == id)
    props.updateCartItem({...item, amount})
  }

  useEffect(() => {
    props.loadCart()
  }, [props.products.length])

  const subTotal = numeral(props.products.reduce((sum, e)  => sum + e.price * e.amount, 0))

  return <div className="grid-1 card card--no-bg">
        { props.products.map(item => {
          let errorDiv = null
          if(props.error && props.error.data.userProductId == item.id&& Errors.INSUFFICIENT_STOCK == props.error.type ) {
            errorDiv = <span className='t--white'>ERROR: Only {props.error.data.stock} available.</span>
          }
          return (
            <div className="grid-1 row-gap-10" key={item.id}>
              <div className="flex--row flex--between">
                <div className="t--strong t--white t--size-b3">
                  {item.name}
                </div>
                <i className="fas fa-times t--grayish t--size-b3 clickable"
                  onClick={() => props.removeItemFromCart({id: item.id}) }></i>
              </div>
              <div className="t--size-b3 t--grayish grid-12 flex--align-center t--align-c">
                <input 
                  className="in__small-num col-1"
                  type="number"
                  value={item.amount}
                  onChange={e => updateCartItemQty(e.target.value, item.id) }
                  style={{
                    border: '1px solid white',
                    borderRadius: '3px',
                    background: 'transparent',
                    color: 'white'
                  }}
                />
                <div className="col-1">x</div>
                <div className="col-1">{item.price}</div>
              </div>
              {errorDiv}
            </div>
          )
        })}
      {props.products.length && (
        <div className="grid-1 row-gap-10">
          <div className="flex--row flex--between">
            <div className="t--white">Subtotal</div>
            <div className="t--white t--strong">
              { subTotal.format('0,0')} MXN
            </div>
          </div>
          { props.unknown_error && <span className='t--white'>* An error ocurred, please try again later.</span> }
          <div className="button btn--orng-white"
            onClick={() => props.checkout()}>
              CHECKOUT
          </div>
        </div>
      )}
    </div>
}

export default ShoppingCart
