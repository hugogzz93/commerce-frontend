import React, { useState, useEffect} from 'react'
import ThumbCard from '../../../cards/ThumbCard'
import Chat from '../../../Chat/index.js'

const IssueForm = props => {
  const [selectedVendor, selectVendor] = useState(null)

  if(selectedVendor)
    return (
      <div className="card flex--col">
        <div className="card__heading flex--row">
          <div className="button btn--danger" onClick={() => selectVendor(null)}>
            Change Vendor
          </div>
          <div className="button" onClick={() => selectVendor(null)}>
            Close Issue
          </div>
        </div>
        <Chat order={props.orders.find(o => o.vendor == selectedVendor)}/>
      </div>
    )
  else
    return (
      <div className="card flex--col">
        <div className="card">
          Select the vendor you would like to speak with
        </div>
        { props.orders.map(order => (
            <ThumbCard
              key={order.id}
              title={order.vendor.name}
              selected={selectedVendor && selectedVendor.id == order.vendor.id}
              onClick={() => { selectVendor(order.vendor) }}
            />
        )) }
      </div>
    )
}
export default IssueForm
