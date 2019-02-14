import React, { useState, useEffect } from 'react'
import Order from './Order/pure'
import '../../../style/orderIndex.sass'

const OrderIndex = props => {
  useEffect(() => {
    if(props.user_id) props.getCreatedOrders({user_id: props.user_id})
  }, [props.user_id])


  const createdOrdersDiv = props.createdOrders.map(order => (
    <div className="oc__list-item" key={order.id}>
      <Order order={order}/>
    </div>
  ))

  return (
    <div className="orders__index content">
      <div className="order__list container--70">
        { createdOrdersDiv }
      </div>
    </div>
  )
}

export default OrderIndex
