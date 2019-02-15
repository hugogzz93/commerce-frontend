import React, { useState, useEffect } from 'react'
import Order from './Order/pure'
import {  BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import '../../../style/orderIndex.sass'

const OrderIndex = props => {
  useEffect(() => {
    if(!props.user_id) return
    props.getCreatedOrders({user_id: props.user_id})
    props.getAttendingOrders({user_id: props.user_id})
  }, [props.user_id])


  const createdOrdersDiv = props.createdOrders.map(order => (
    <div className="oc__list-item" key={order.id}>
      <Order order={order}/>
    </div>
  ))

  const attendingOrdersDivs = props.attendingOrders.map(order => (
    <div class="oc__list-item" key={order.id}>
      <Order order={order}/>
    </div>
  ))

  return (
    <div className="orders__index content">
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
              key={location.key}
              timeout={300}
              classNames='fade' >
              <Switch location={location}>
                <Route path='/user/orders/created' component={ () =>
                  <div className="order__list container--70">
                    { createdOrdersDiv }
                  </div>
                }>
                </Route>
                <Route path='/user/orders/attending' component={ () =>
                  <div class="order__list container--70">
                    { attendingOrdersDivs }
                  </div>
                }>
                </Route>
              </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}>
      </Route>
    </div>
  )
}

export default OrderIndex
