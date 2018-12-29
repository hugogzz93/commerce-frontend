import React, { useEffect } from 'react'

const UserProducts = props => {
  const {user_id, producs} = props
  const productList =  props.products.map(product => (
    <div className="card">
      <div className="text__pair--ver">
        <div className="text__key">product.name</div>
        <div className="text__value">product.description</div>
      </div>
    </div>
  ))

  useEffect(() => {
    user_id && props.getProducts({id: user_id})
  }, [user_id])

  return(
    <div className="user-products__list">
      {productList}
    </div>
  )
}

export default UserProducts
