import React, { Component, createContext } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.sass';
import Search from './components/Search'
import ThumbCard from './components/cards/ThumbCard'
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'


const SessionContext = createContext({auth_token: null, setAuthToken: () => {}})

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
    this.state = {loginModalActive: false}
    this.loginModalToggle = this.loginModalToggle.bind(this)
  }

  loginModalToggle() {
    this.setState({loginModalActive: !this.state.loginModalActive})
  }


  render() {
    return (
      <Router>
        <div className='app_wrapper'>
          <NavBar loginIconHandler={this.loginModalToggle}/>
          <LoginModal active={this.state.loginModalActive} />
          {/* <Link to='/search'> */}
          {/*   Search */}
          {/* </Link> */}
          {/* <Link to='/'> */}
          {/*   Home */}
          {/* </Link> */}
          <Route path='/' component={Search}/>
        </div>
      </Router>
    );
  }
}

export default App;
