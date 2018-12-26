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
import Login from '../Login/index'
import NavBar from '../NavBar/index'
import FormSlide from '../FormSlide/index'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {loginModalActive: true}
    this.loginModalToggle = this.loginModalToggle.bind(this)
  }

  componentDidMount() {
    this.props.checkLoggedIn()
  }

  loginModalToggle() {
    this.setState({loginModalActive: !this.state.loginModalActive})
  }


  render() {
    return (
      <Router>
        <div className='app_wrapper'>
          {/* <NavBar loginIconHandler={this.loginModalToggle}/> */}
          {!this.props.auth_token && <Login active={this.state.loginModalActive} /> }
          {!!this.props.auth_token &&  <Link to='/profile/edit'> Edit </Link>}
          {/* {this.props.editModalActive } */}
          <Link to='/'>
            Search
          </Link>
          <Route render={({location}) => (
            <TransitionGroup>
              <CSSTransition 
                key={location.key}
                timeout={3000}
                classNames='fade'
              >
                <Switch location={location}>
                  <Route exact={true} path='/' component={Search}/>
                  <Route path='/profile/edit' component={() => (
                    <div className="overlay ">
                      <div className="container--50">
                        <FormSlide />
                      </div>
                    </div>
                  )}/>
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
