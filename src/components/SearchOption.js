import React, { Component } from 'react'

const SearchOption = (props) => {
  const { title, index, clickHandler, selected } = props
  const selectedClass = selected ? 'card--selected' : ''

  const onClick = () => {
    clickHandler(index.toString(), title)
  }

  return(
    <div 
      key={index}
      className={`search__option fade-in ${selectedClass}`}
      onClick={onClick}>
      {title}
    </div>
  )
}

export default SearchOption
