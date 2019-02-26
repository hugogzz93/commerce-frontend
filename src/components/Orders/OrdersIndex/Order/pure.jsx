import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CarouselWrapper from '../../../CarouselWrapper'
import AccordionCard from '../../../cards/AccordionCard'
import numeral from 'numeral'


const Order= props => {
  const order = props.order
  const [currentSlide, setSlide] = useState(0)
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
              <span className='triplet'>{new Date(parseInt(order.createdAt)).toDateString()}</span>
              <span className='triplet accordion--hide-on-active'>{numeral( order.total ).format('0,0')} MXN</span>
              <span className='triplet accordion--hide-on-active'>{order.orderItems.length} Items {newMessages &&  <i class="far fa-envelope"></i>}</span>
            </React.Fragment>
          }
          footer={
            <React.Fragment>
              <div className="buttons">
                <Link className="button btn--danger btn--small" style={{float: 'left', marginRight: '5px'}} to={'/user/orders/chat/' + order.id}>
                  Issues
                </Link>
                <div className="button btn--small" style={{float: 'left'}} onClick={() => setSlide(1)}>
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
