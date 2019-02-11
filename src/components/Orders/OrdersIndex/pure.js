import React, { useState, useEffect } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import AccordionCard from '../../cards/AccordionCard'
import '../../../style/orderIndex.sass'

const OrderIndex = props => {
  
  useEffect(() => {
    if(props.user_id) props.getCreatedOrders({user_id: props.user_id})
  }, [props.user_id])


  const createdOrdersDiv = props.createdOrders.map(order => (
    <div className="oc__list-item shadow--spec" key={order.id}>
      <AccordionCard
        header={
          <React.Fragment>
            <span className='triplet'>{new Date(parseInt(order.createdAt)).toDateString()}</span>
            <span className='triplet accordion--hide-on-active'>{numeral( order.total ).format('0,0')} MXN</span>
            <span className='triplet accordion--hide-on-active'>{order.orderItems.length} Items</span>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <span style={{float: 'right'}}>{numeral(order.total).format('0,0')} MXN</span>
          </React.Fragment>
        }
      >
        { order.orderItems.map(({userProduct: {name}, id, status, price, amount}) => (
          <div className='oc__list-item flex--even' key={id}>
            <span className='triplet'>{name}</span>
            <span className="triplet">{status}</span>
            <span className='triplet'>{amount} x {numeral(price).format('0,0')} MXN</span>
          </div>
        ))}
      </AccordionCard>
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
