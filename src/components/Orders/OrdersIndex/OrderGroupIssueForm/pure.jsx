import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ThumbCard from '../../../cards/ThumbCard'
// import Chat from '../../../Chat/index.js'

const IssueForm = props => {
  // const [selectedVendor, selectVendor] = useState(null)
  const gridSize = ( props.orders.length == 1 ? 1 : props.orders.length > 2 ? 3 : 2 )

  // if(selectedVendor)
  //   return (
  //     // <div className="card flex--col">
  //     //   <div className="card__heading flex--row">
  //     //     <div className="button btn--danger" onClick={() => selectVendor(null)}>
  //     //       Change Vendor
  //     //     </div>
  //     //     <div className="button" onClick={() => selectVendor(null)}>
  //     //       Close Issue
  //     //     </div>
  //     //   </div>
  //       <Chat order={props.orders.find(o => o.vendor == selectedVendor)}/>
  //     // </div>
  //   )
  // else
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
                <div className="card__title" style={
                  { margin: "0 0 10px 0"}
                }>{order.vendor.name} </div>
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
