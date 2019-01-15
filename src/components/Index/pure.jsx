import React, { Component, useEffect, useState } from 'react'
import ThumbCard from '../cards/ThumbCard'
import ImageCard from '../cards/ImageCard'
import IndexDetail from './IndexDetail/index'

const Index = (props) => {
  const [items, setItems] = useState([])
  const [detail, setDetail] = useState({})
  const [filter, setFilter] = useState('')
  const [ itemCursor, setItemCursor ] = useState(0)
  const { product: {title, id} } = props

  const handleSearchChange = (event) => {
    setFilter(event.target.value)
  }

  const itemDivs = items.map(({name, email}, i) => (
    <div className='index__item fade-in' key={i}>
      <ThumbCard 
        title={name}
        subtitle={email}
        selected={itemCursor == i ? true : false}
        onClick={() => { setItemCursor(i) }}
      />
    </div>
  ))

  useEffect(() => {
    props.getProductUsers({productId: props.product.id})
  }, [])

  useEffect(() => {
    try {
      if(filter.length)
        setItems(props.product.users.filter(user => user.name.toLowerCase().includes(filter)))
      else
        setItems(props.product.users || [])
    } catch(e) {}
  }, [filter, props.product.users])


  useEffect(() => {
    const handleKeys = e => {
      switch(e.which) {
        case 40:
          setItemCursor(( itemCursor + 1 + items.length ) % items.length)
          break

        case 38:
          setItemCursor(( itemCursor - 1  + items.length) % items.length)
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
          value={filter}
          onChange={ handleSearchChange }
        />
        <i className='fas fa-search'></i>
      </div>
      <div className='index__content-list fade-in-list'>
        { itemDivs }
      </div>
      { items[itemCursor] && <IndexDetail id={items[itemCursor].id} />}
    </div>
  )
}

export default Index
