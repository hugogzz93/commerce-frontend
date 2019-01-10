import React, { useEffect, useState, useReducer } from 'react'

const UserProducts = props => {
  const userId = props.userId
  const removeProduct = e => (
    props.removeProduct({userId, productId: e.target.dataset.productId})
  )
  const addProduct = e => (
    props.addProduct({userId, productId: e.target.dataset.productId})
  )

  const productList = props.products.map(product => (
    <div className="card col-3 up__li" key={product.id}>
      <div className="text__pair--ver">
        <div className="text__key">{product.name}</div>
        {/* <div className="text__value">{product.description}</div> */}
      </div>
      <div className="button btn--danger" onClick={removeProduct} data-product-id={product.id}>X</div>
    </div>
  ))

  useEffect(() => {
    props.getProducts({userId})
  }, [userId])

  return(
    <div className="up__list grid-12">
      {productList}
    </div>
  )
}

export default UserProducts
