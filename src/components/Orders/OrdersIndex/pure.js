import React, { useState, useEffect } from 'react'
import OrderGroup from './OrderGroup/pure'
import Order from './Order'
import OrderIssueForm from  './OrderGroupIssueForm'
import Chat from '../../Chat/index.js'
import {  BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import '../../../style/orderIndex.sass'

const OrderIndex = props => {
  const createdOrdersLocation = '/user/orders/created'
  const attendingOrdersLocation = '/user/orders/attending'
  const [statusFilter, setStatusFilter] = useState(null)

  useEffect(() => {
    if(!props.user_id) return
    if(window.location.href.match('created'))
      props.getCreatedOrders({user_id: props.user_id})
    else if(window.location.href.match('attending'))
      props.getAttendingOrders({user_id: props.user_id})
  }, [props.user_id])



  const createdOrdersDiv = props.orderGroups
  .filter( o => statusFilter ? o.status == statusFilter : true )
  .map(orderGroup => (
    <div className="oc__list-item" key={orderGroup.id}>
      <OrderGroup orderGroup={orderGroup}/>
    </div>
  ))

  const attendingOrdersDivs = props.attendingOrders
  .filter( o => statusFilter ? o.status == statusFilter : true )
  .map(order => (
    <div className="oc__list-item" key={order.id}>
      <Order order={order}/>
    </div>
  ))

  const noOrdersCard = (
      <div className="orders__index content">
          <div className="card">
            <div className="card--info">No orders</div>
          </div>
      </div>
  )

  return (
    <div className="orders__index content">
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
              key={location.key}
              timeout={300}
              classNames='fade' >
              <Switch location={location}>
                <Route exact={true} path='/user/orders/created' component={ () =>
                  <div class="container--70">
                    <div className="order__list">
                      <div className="cn__row flex--row">
                        <select className="order__status-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value == 'no_filter' ? null : e.target.value)}>
                          <option value="no_filter">No Filter</option>
                          <option value="in_progress">In Progress</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                      { props.orderGroups.length ? createdOrdersDiv : noOrdersCard }
                      {props.orderGroups.length}
                    </div>
                  </div>
                }>
                </Route>
                <Route exact={true} path='/user/orders/attending' component={ () =>
                  <div className="order__list container--70">
                    <div className="cn__row flex--row">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                          <option value="no_filter">No Filter</option>
                          <option value="in_progress">In Progress</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                    {props.attendingOrders.length ? attendingOrdersDivs : noOrdersCard }
                    {props.attendingOrders.length}
                  </div>
                }>
                </Route>
                {/* <Route path='/user/orders/created/issue/:order_group_id' component={ ({match}) => */}
                {/*   <div className="order__container"> */}
                {/*     <OrderIssueForm orderGroupId={match.params.order_group_id}/>  */}
                {/*   </div> */}
                {/* }></Route> */}
                {/* <Route path='/user/orders/chat/:id' component={({match}) => */}
                {/*   <div className="order__container"> */}
                {/*     <div className="card flex--col"> */}
                {/*       <Chat orderId={match.params.id}/> */}
                {/*     </div> */}
                {/*   </div> */}
                {/* }> */}
                {/* </Route> */}
              </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}>
      </Route>
    </div>
  )
}

export default OrderIndex
