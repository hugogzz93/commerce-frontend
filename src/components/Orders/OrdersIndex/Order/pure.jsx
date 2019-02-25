import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CarouselWrapper from '../../../CarouselWrapper'
import AccordionCard from '../../../cards/AccordionCard'
import numeral from 'numeral'


const Order= props => {
  const order = props.order
  const newMessages = order.issues.some(e => e.newMessages)

  return(
    <div className="order__container">
      <AccordionCard
        header={
          <React.Fragment>
            <span className='triplet'>{new Date(parseInt(order.createdAt)).toDateString()}</span>
            <span className='triplet accordion--hide-on-active'>{numeral( order.total ).format('0,0')} MXN</span>
            <span className='triplet accordion--hide-on-active'>{order.orderItems.length} Items {newMessages &&  <i class="far fa-envelope"></i>}</span>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <Link className="button btn--danger btn--small" style={{float: 'left'}} to={'/user/orders/chat/' + order.id}>
              Issues
            </Link>
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
  )
}

export default Order
