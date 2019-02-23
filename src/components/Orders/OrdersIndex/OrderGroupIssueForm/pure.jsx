import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ThumbCard from '../../../cards/ThumbCard'

const IssueForm = props => {
  const gridSize = ( props.orders.length == 1 ? 1 : props.orders.length > 2 ? 3 : 2 )

  return (
    <div className="">
      <div style={{
        margin: "0 0 1em 0",
        textAlign: "left"
      }}>
        Select the vendor you would like to speak with
      </div>
      <div className={`grid-${gridSize} col-gap-20`}>
        { props.orders.map(order => (
            <Link className="card card--clickable col-1" key={order.id} to={'/user/orders/chat/'+order.id}>
              <div className="card__title" style={{ margin: "0 0 10px 0"}}>
                {order.vendor.name}
                { order.issues.some(i => i.newMessages) && <span>New Messages</span>  }
              </div>
              <div className="card__info flex--col">
                { order.orderItems.map(item => (
                  <span className="p--left" style={{margin: "0 0 0.3em 0"}} key={item.id}>{item.userProduct.name}</span>
                ))}
              </div>
            </Link>
        )) }
      </div>
    </div>
  )
}
export default IssueForm
