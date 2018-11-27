import React, { Component } from 'react'

const SearchOption = (props) => {
  const { title, key } = props

  return(
    <div key={key} className='search__option'>
      {title}
    </div>
  )
}

export default SearchOption
