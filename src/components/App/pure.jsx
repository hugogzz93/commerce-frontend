import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from '../../logo.svg';
import './App.sass';
import Search from '../Search'
import ThumbCard from '../cards/ThumbCard'
import Login from '../Login/index'
import NavBar from '../NavBar/index'
import FormSlide from '../FormSlide/index'


const Root = (props) => (
  <div className="app content">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)

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
          {!!this.state.email && <Login active={this.state.loginModalActive} /> }
          <Link to='/profile/edit'>
            Edit
          </Link>
          <Link to='/'>
            Search
          </Link>
          <Route exact={true} path='/' component={Search}/>
          <Route path='/profile/edit' component={() => (
            <div className="overlay ">
              <div className="container--50">
                <FormSlide />
              </div>
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
