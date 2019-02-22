import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import logo from '../../logo.svg';
import './App.sass';
import Search from '../Search'
import ThumbCard from '../cards/ThumbCard'
import NavBar from '../NavBar/index'
import UserConfiguration from '../../components/UserConfiguration/index'
import OrderIndex from '../Orders/OrdersIndex/index'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../style/overwrites/carousel.sass'
import '../../style/chat.sass'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {loginModalActive: true}
  }

  componentDidMount() {
    this.props.checkLoggedIn()
  }

  render() {
    return (
      <Router>
        <div className='app_wrapper'>
          <NavBar/>
          <Route render={({location}) => (
            <TransitionGroup>
              <CSSTransition 
                key={location.key}
                timeout={300}
                classNames='fade' >
                <Switch location={location}>
                  <Route exact={true} path='/' component={Search}/>
                  <Route path='/users/edit' component={ UserConfiguration }/>
                  <Route path='/user/orders' component={ OrderIndex } />
                </Switch>
              </CSSTransition>
          </TransitionGroup>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
