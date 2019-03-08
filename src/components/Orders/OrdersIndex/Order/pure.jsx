import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CarouselWrapper from '../../../CarouselWrapper'
import AccordionCard from '../../../cards/AccordionCard'
import { Mutation } from 'react-apollo'
import numeral from 'numeral'
import gql from 'graphql-tag'

const Order= props => {
  const order = props.order
  const [currentSlide, setSlide] = useState(0)
  const [showStatusForm, setStatusVisibility] = useState(false)
  const [status, setStatus] = useState(order.status)
  const newMessages = order.issues.some(e => e.newMessages)

  return(
      <CarouselWrapper showThumbs={false}
                showIndicators={false}
                showStatus={false}
                transitionTime={150}
                selectedItem={currentSlide}>
        <AccordionCard
          header={
            <div class="grid-4">
              <span className='col-1 t--align-l'>{new Date(parseInt(order.createdAt)).toDateString()}</span>
              <span className='col-1 t--align-c accordion--hide-on-active'>{numeral( order.total ).format('0,0')} MXN</span>
              <span className='col-1 t--align-c accordion--hide-on-active'>{order.orderItems.length} Items {newMessages &&  <i class="far fa-envelope"></i>}</span>
              <div className="col-1 t--align-r">
                <select value={status}
                  onChange={e => props.updateStatus( e.target.value).then(r => setStatus( r.data.order.updateOrder.status ))}
                  onClick={e => e.stopPropagation()}
                >
                  <option value="in_progress">In Progress</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
          }
          footer={
            <div class="flex--row flex--between flex--align-center">
              <div className="button btn--small" onClick={() => setSlide(1)}> Client </div>
              {numeral(order.total).format('0,0')}
            </div>
          }
        >
          <div className="grid-1 row-gap-15">
            { order.orderItems.map(({userProduct: {name}, id, status, price, amount}) => (
              <div className='grid-3' key={id}>
                <span className='col-1'>{name}</span>
                <span className="col-1 t--align-c">{status}</span>
                <span className='col-1 t--align-r'>{amount} x {numeral(price).format('0,0')} MXN</span>
              </div>
            ))}
          </div>
        </AccordionCard>
        <div className="card card--no-padding">
          <div>
            <div className="button btn--small" onClick={() => setSlide(0)} style={{float: 'left'}}>
              Return
            </div>
          </div>
          <div>
            <p>{order.client.name}</p>
            <p>{order.client.email}</p>
            <p>{order.client.phone}</p>
            <br />
            <p className="p--small">{order.client.country} / {order.client.city}</p>
            <p className="p--small">{order.client.street} / {order.client.street_2} / {order.client.street_number}</p>
          </div>
        </div>
      </CarouselWrapper>
  )
}

export default Order
