import React, { Component, useEffect, useState } from 'react'
import ThumbCard from '../cards/ThumbCard'
import ImageCard from '../cards/ImageCard'
import IndexDetail from './IndexDetail/index'

const Index = (props) => {
  const [options, setOptions] = useState([])
  const [detail, setDetail] = useState({})
  const [filter, setFilter] = useState({name: ''})
  const [ optionCursor, setOptionCursor ] = useState(0)
  const { product: {title, id} } = props

  const handleSearchChange = (event) => {
    setFilter({...filter, name: event.target.value})
  }

  const indexItems = options.map(({title, subtitle}, i) => (
    <div className='index__item fade-in' key={i}>
      <ThumbCard 
        title={title}
        subtitle={subtitle}
        selected={optionCursor == i ? true : false}
      />
    </div>
  ))

  useEffect(() => {
    props.getUsersForProduct(id, filter).then(res => {
      setOptions(res.data.products[0].users)
    })
  }, [title, filter])

  useEffect(() => {
    const handleKeys = e => {
      switch(e.which) {
        case 40:
          setOptionCursor(( optionCursor + 1 + options.length ) % options.length)
          break

        case 38:
          setOptionCursor(( optionCursor - 1  + options.length) % options.length)
          break
      }
    }

    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  })

  return(
    <div className='index__container' >
      <div className='index__search-container'>
        <input 
          className='index__search'
          placeholder='search'
          value={filter.name}
          onChange={ handleSearchChange }
        />
        <i className='fas fa-search'></i>
      </div>
      <div className='index__content-list fade-in-list'>
        {indexItems}
      </div>
      { options[optionCursor] && <IndexDetail id={options[optionCursor].id} />}
    </div>
  )
}

export default Index
