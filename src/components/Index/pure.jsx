import React, { Component, useEffect, useState } from 'react'
import ThumbCard from '../cards/ThumbCard'
import ImageCard from '../cards/ImageCard'
import IndexDetail from './IndexDetail/index'

const DetailHeading = props => (
<div className="index__heading fade-in-list">
  <div className="t--row fade-in">{props.city}</div>
  <div className="t--row fade-in">{props.country}</div>
  <div className="t--row fade-in">{props.zipcode}</div>
</div>
)

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
    <ThumbCard 
      key={i}
      title={name}
      selected={itemCursor == i}
      onClick={() => { setItemCursor(i) }}
      className={'fade-in' + ( itemCursor == i ? ' card--highlight' : '')}
    />
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
      if(e.target != document.body) return
      switch(e.which) {
        case 40:
          setItemCursor(( itemCursor + 1 + items.length ) % items.length)
          e.preventDefault()
          break

        case 38:
          setItemCursor(( itemCursor - 1  + items.length) % items.length)
          e.preventDefault()
          break
      }
    }

    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  })

  return(
    <div className='grid-12 col-gap-10 row-gap-10 container--100' >

      <div className="col-3">
        <div className='s__content'>
          <input 
            className='s__input'
            placeholder='search'
            value={filter}
            onChange={ handleSearchChange }
          />
          <i className='fas fa-search'></i>
        </div>
      </div>
      <div className="col-9">
        <DetailHeading {...items[itemCursor]}/>
      </div>

      <div className="col-3" style={{borderBottom: '1px solid #e2e4ef'}}></div>
      <div className="col-9" style={{borderBottom: '1px solid #e2e4ef'}}></div>

      <div className='col-3'>
        { itemDivs }
      </div>
      { items[itemCursor] && <IndexDetail id={items[itemCursor].id} product_id={id} />}

    </div>
  )
}

export default Index
