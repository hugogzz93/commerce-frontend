import React, {useState, useEffect} from 'react'
import CarouselWrapper from '../../../CarouselWrapper'
import AccordionCard from '../../../cards/AccordionCard'
import numeral from 'numeral'
import OrderIssueForm from '../IssueForm'
import Chat from '../../../Chat'


const OrderGroup = props => {
  const [slideControl, setSlideControls] = useState({})
  const orderGroup = props.orderGroup
  const orderItems = orderGroup.orders
                          .reduce((items, order) => [...items, ...order.orderItems], [])

  return(
    <div className="order__container">
      <CarouselWrapper showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    showArrowns={false}
                    useKeyboardArrows={true}
                    transitionTime={150}
                    controlSetter={setSlideControls}
          >
            <AccordionCard
              header={
                <React.Fragment>
                  <span className='triplet'>{new Date(parseInt(orderGroup.createdAt)).toDateString()}</span>
                  <span className='triplet accordion--hide-on-active'>{numeral( orderGroup.total ).format('0,0')} MXN</span>
                  <span className='triplet accordion--hide-on-active'>{orderItems.length} Items</span>
                </React.Fragment>
              }
              footer={
                <React.Fragment>
                  <div className="button btn--danger btn--small" style={{float: 'left'}} onClick={() => slideControl.setSlide(1)}>Create Issue</div>
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
            <OrderIssueForm orders={orderGroup.orders}/>
          </CarouselWrapper>
    </div>
  )
}

export default OrderGroup
