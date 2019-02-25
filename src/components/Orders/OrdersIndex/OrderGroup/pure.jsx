import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AccordionCard from '../../../cards/AccordionCard'
import numeral from 'numeral'
import OrderIssueForm from '../OrderGroupIssueForm'
import Chat from '../../../Chat'


const OrderGroup = props => {
  const orderGroup = props.orderGroup
  const orderItems = orderGroup.orders
                          .reduce((items, order) => [...items, ...order.orderItems], [])
  const newMessages = orderGroup.orders.some(o => o.issues.some(i => i.newMessages))

  return(
    <div className="order__container">
      <AccordionCard
        header={
          <React.Fragment>
            <span className='triplet'>{new Date(parseInt(orderGroup.createdAt)).toDateString()}</span>
            <span className='triplet accordion--hide-on-active'>{numeral( orderGroup.total ).format('0,0')} MXN</span>
            <span className='triplet accordion--hide-on-active'>{orderItems.length} Items {newMessages && <i class="far fa-envelope"></i> }</span>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <Link className="button btn--danger btn--small" style={{float: 'left'}} to={'/user/orders/created/issue/' + orderGroup.id}>
              Issues
            </Link>
            <span style={{float: 'right'}}>{numeral(orderGroup.total).format('0,0')} MXN</span>
          </React.Fragment>
        }
      >
        { orderItems.map(({userProduct: {name}, id, status, price, amount}) => (
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

export default OrderGroup
