import React, { useEffect, useState, useReducer } from 'react'
import ThumbCard from '../../cards/ThumbCard'

const UserProducts = props => {
  const userId = props.userId
  const [searchFilter, setSearchFilter] = useState('')
  const [ searchProducts, setSearchProducts ] = useState([])

  useEffect(() => {
    props.getUserProducts({userId})
    props.getProducts()
  }, [userId])

  const searchItemDivs = props.products
        .filter(p => searchFilter.length && p.name.toLowerCase().includes(searchFilter.toLowerCase()) || !searchFilter.length)
        .map(( {name, description, id}, i ) => (
            <div className='fade-in up__search-item index__item' key={i}>
              <ThumbCard 
                title={name}
                subtitle={description}
                onClick={() => props.addProducts({userId, productIds: [id]})}
              />
            </div>
        ))


  const userProductDivs = props.userProducts.map(( product, i ) => (
    <div className="card up__li fade-in" key={product.id + i}>
      <div className="text__pair--ver">
        <div className="text__key">{product.name}</div>
        {/* <div className="text__value">{product.description}</div> */}
      </div>
      <div className="button btn--danger"
        onClick={() => props.removeProducts({userId, productIds: [product.id]})}
        data-product-id={product.id}>X</div>
    </div>
  ))

  return(
    <div className="grid-12 container--90">
      <div className="flex--col col-3 up__search">
        <input className="up__search-input"
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <div className="up__search-items fade-in-list">
          { searchItemDivs }
        </div>
      </div>
      <div className="col-9 up__list flex__row fade-in-list">
        { userProductDivs }
      </div>
    </div>
  )
}

export default UserProducts
