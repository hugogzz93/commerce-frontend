import React, { useContext, createContext, useReducer } from 'react'


export const generateContext = () => {
  const StateContext = createContext()
  const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  )

  const useStateValue = () => useContext(StateContext)
  return [ StateProvider, useStateValue ]
}
