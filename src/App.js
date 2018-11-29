import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.sass';
import Search from './components/Search'
import ThumbCard from './components/cards/ThumbCard'

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
  render() {
    return (
      <Router>
        <div className='app_wrapper'>
          <Link to='/search'>
            Search
          </Link>
          <Link to='/'>
            Home
          </Link>
          <Route exact={true} path='/' component={Root}/>
          <Route path='/search' component={Search}/>
        </div>
      </Router>
    );
  }
}

export default App;
