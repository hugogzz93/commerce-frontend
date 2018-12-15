import React, { Component, createContext } from 'react'

const SessionContext = createContext()

class SessionProvider extends Component {

  constructor(props) {
    super(props)
    this.state = {
      auth_token: null,
      email: null,
      name: null,
      setSessionState: this.setState.bind(this)
    }
  }

  render() {
    return(
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export {SessionProvider, SessionContext}
