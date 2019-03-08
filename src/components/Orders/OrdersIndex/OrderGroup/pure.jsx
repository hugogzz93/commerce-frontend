import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AccordionCard from '../../../cards/AccordionCard'
import numeral from 'numeral'
import OrderIssueForm from '../OrderGroupIssueForm'
import Chat from '../../../Chat'
import Helpers from '../../../../lib/helpers'


const OrderGroup = props => {
  const orderGroup = props.orderGroup
  const orderItems = orderGroup.orders
                          .reduce((items, order) => [...items, ...order.orderItems.map(o => ({...o, status: order.status}))], [])
  const newMessages = orderGroup.orders.some(o => o.issues.some(i => i.newMessages))

  return(
    <AccordionCard
      header={
        <div class="grid-4">
          <span className='col-1 t--align-l'>{new Date(parseInt(orderGroup.createdAt)).toDateString()}</span>
          <span className='col-1 t--align-c accordion--hide-on-active'>{numeral( orderGroup.total ).format('0,0')} MXN</span>
          <span className='col-1 t--align-c accordion--hide-on-active'>{orderItems.length} Items {newMessages && <i class="far fa-envelope"></i> }</span>
          <span className='col-1 t--align-r accordion--hide-on-active'>{Helpers.translateStatus(orderGroup.status)}</span>
        </div>
      }
      footer={
        <React.Fragment>
          <span style={{float: 'right'}}>{numeral(orderGroup.total).format('0,0')} MXN</span>
        </React.Fragment>
      }
    >
      <div className="grid-1 row-gap-15">
        { orderItems.map(({userProduct: {name}, id, status, price, amount}) => (
          <div className='grid-3' key={id}>
            <span className='col-1'>{name}</span>
            <span className="col-1 t--align-c">{Helpers.translateStatus(status)}</span>
            <span className='col-1 t--align-r'>{amount} x {numeral(price).format('0,0')} MXN</span>
          </div>
        ))}
      </div>
    </AccordionCard>
  )
}

export default OrderGroup
