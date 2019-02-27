import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CarouselWrapper from '../../../CarouselWrapper'
import AccordionCard from '../../../cards/AccordionCard'
import { Mutation } from 'react-apollo'
import numeral from 'numeral'
import gql from 'graphql-tag'



const StatusSelect = props => (
  <select className="order__status-select" value={props.value} onChange={props.onChange} onClick={e => e.stopPropagation()}>
    <option value="in_progress">In Progress</option>
    <option value="in_transit">In Transit</option>
    <option value="delivered">Delivered</option>
    <option value="canceled">Canceled</option>
  </select>
)


const Order= props => {
  const order = props.order
  const [currentSlide, setSlide] = useState(0)
  const [showStatusForm, setStatusVisibility] = useState(false)
  const [status, setStatus] = useState(order.status)
  const newMessages = order.issues.some(e => e.newMessages)

  return(
    <div className="order__container">
      <CarouselWrapper showThumbs={false}
                showIndicators={false}
                showStatus={false}
                transitionTime={150}
                selectedItem={currentSlide}>
        <AccordionCard
          header={
            <React.Fragment>
              <span className=''>{new Date(parseInt(order.createdAt)).toDateString()}</span>
              <span className=' accordion--hide-on-active'>{numeral( order.total ).format('0,0')} MXN</span>
              <span className=' accordion--hide-on-active'>{order.orderItems.length} Items {newMessages &&  <i class="far fa-envelope"></i>}</span>
              <StatusSelect value={status} onChange={e => props.updateStatus( e.target.value).then(r => setStatus( r.data.order.updateOrder.status ))} />
            </React.Fragment>
          }
          footer={
            <React.Fragment>
              <div className="buttons">
                {/* <Link className="button btn--danger btn--small" to={'/user/orders/chat/' + order.id}> */}
                {/*   Issues */}
                {/* </Link> */}
                <div className="button btn--small" onClick={() => setSlide(1)}>
                  Client
                </div>
              </div>
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
        <div className="card card--no-padding card--info">
          <div className="card__content">
            <div className="button btn--small" onClick={() => setSlide(0)} style={{float: 'left'}}>
              Return
            </div>
          </div>
          <div className="card__content">
            <p>{order.client.name}</p>
            <p>{order.client.email}</p>
            <p>{order.client.phone}</p>
            <br />
            <p className="p--small">{order.client.country} / {order.client.city}</p>
            <p className="p--small">{order.client.street} / {order.client.street_2} / {order.client.street_number}</p>
          </div>
        </div>
      </CarouselWrapper>
    </div>
  )
}

export default Order
