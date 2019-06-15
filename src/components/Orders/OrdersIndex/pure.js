import React, { useState, useEffect } from "react";
import OrderGroup from "./OrderGroup/pure";
import Order from "./Order";
import OrderIssueForm from "./OrderGroupIssueForm";
import Chat from "../../Chat/index.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Helpers from "../../../lib/helpers";

const OrderIndex = props => {
  const createdOrdersLocation = "/user/orders/created";
  const attendingOrdersLocation = "/user/orders/attending";
  const [statusFilter, setStatusFilter] = useState("");
  const [orderGroups, setOrderGroups] = useState([]);
  const [ordersAsVendor, setOrdersAsVendor] = useState([]);

  useEffect(() => {
    if (!props.userId) return;
    if (window.location.href.match(createdOrdersLocation))
      props
        .fetchOrderGroups()
        .then(Helpers.sortByDate)
        .then(setOrderGroups);
    if (window.location.href.match(attendingOrdersLocation))
      props
        .fetchOrdersAsVendor()
        .then(Helpers.sortByDate)
        .then(setOrdersAsVendor);
  }, [props.userId]);

  const createdOrdersDiv = orderGroups
    .filter(o => (statusFilter.length ? o.status == statusFilter : true))
    .map(group => (
      <div key={group.id}>
        <OrderGroup orderGroup={group} />
      </div>
    ));

  const attendingOrdersDivs = ordersAsVendor
    .filter(o => (statusFilter.length ? o.status == statusFilter : true))
    .map(order => (
      <div key={order.id}>
        <Order order={order} />
      </div>
    ));

  const noOrdersCard = <div className="card">No orders</div>;

  return (
    <div className="">
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch location={location}>
                <Route
                  exact={true}
                  path="/user/orders/created"
                  component={() => (
                    <div className="container--90 grid-1 row-gap-10">
                      <div>
                        <select
                          className="order__status-select"
                          value={statusFilter}
                          onChange={e =>
                            setStatusFilter(
                              e.target.value == "no_filter"
                                ? null
                                : e.target.value
                            )
                          }
                        >
                          <option value="no_filter">No Filter</option>
                          <option value="in_progress">In Progress</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                      {orderGroups.length ? createdOrdersDiv : noOrdersCard}
                    </div>
                  )}
                />
                <Route
                  exact={true}
                  path="/user/orders/attending"
                  component={() => (
                    <div className="container--90 grid-1 row-gap-10">
                      <div>
                        <select
                          className="order__status-select"
                          value={statusFilter}
                          onChange={e =>
                            setStatusFilter(
                              e.target.value == "no_filter"
                                ? null
                                : e.target.value
                            )
                          }
                        >
                          <option value="no_filter">No Filter</option>
                          <option value="in_progress">In Progress</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                      {ordersAsVendor.length
                        ? attendingOrdersDivs
                        : noOrdersCard}
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

export default OrderIndex;
