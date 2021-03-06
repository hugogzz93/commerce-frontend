import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import logo from "../../logo.svg";
import "./App.sass";
import Search from "../Search";
import ThumbCard from "../cards/ThumbCard";
import NavBar from "../NavBar/index";
import SideBar from "../SideBar/SideBar.jsx";
import UserConfiguration from "../../components/UserConfiguration/index";
import OrderIndex from "../Orders/OrdersIndex/index";
import Inventory from "../Inventory";
import { paymentUpdateAction, PAYMENT } from "../../models/ShoppingCart";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "izitoast/dist/css/iziToast.min.css";
import "../../style/overwrites/carousel.sass";
import "../../style/chat.sass";
import "../../style/inputs.sass";
import "../../style/sidebar.sass";

window.$DEBUG = true;

const Checkout = connect(
  null,
  dispatch => dispatch
)(({ match: { status } }, ...props) => {
  props.dispatch(paymentUpdateAction({ status }));
  return <div>Checkout {status}</div>;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loginModalActive: true };
  }

  componentDidMount() {
    this.props.checkLoggedIn();
  }

  render() {
    return (
      <Router>
        <div className="app_wrapper">
          <NavBar />
          <div className="flex--row" style={{ flexWrap: "nowrap" }}>
            <SideBar />
            <div
              className="content"
              style={{ maxHeight: "100vh", flexGrow: 1, overflowY: "scroll" }}
            >
              <Route
                render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={300}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route exact={true} path="/" component={Search} />
                        <Route
                          path="/users/edit"
                          component={UserConfiguration}
                        />
                        <Route path="/user/orders" component={OrderIndex} />
                        <Route path="/user/inventory" component={Inventory} />
                        <Route path="checkout/:status" components={Checkout} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
