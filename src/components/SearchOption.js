import React, { Component } from 'react'

const SearchOption = (props) => {
  const { title, index, clickHandler } = props

  const onClick = () => {
    clickHandler(index.toString(), title)
  }

  return(
    <div key={index} className='search__option fade-in' onClick={onClick}>
      {title}
    </div>
  )
}

export default SearchOption
