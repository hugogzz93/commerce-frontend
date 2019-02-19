import React, { useEffect, useState, useReducer } from 'react'
import ThumbCard from '../../cards/ThumbCard'
import UserProductItems from '../UserProductItems'

const UserProducts = props => {
  const userId = props.userId
  const [searchFilter, setSearchFilter] = useState('')
  const [selectedProduct, selectProduct] = useState(null)

  useEffect(() => {
    props.getUserProducts({userId})
    props.getProducts()
  }, [userId])

  useEffect(() => {
    if(props.userProducts[0] && !selectedProduct) 
      selectProduct(props.userProducts[0])
  }, [props.userProducts])


  const selectedItemDivs = props.userProducts
        .filter(p => searchFilter.length && p.name.toLowerCase().includes(searchFilter.toLowerCase()) || !searchFilter.length)
        .map((product) => (
            <div className='fade-in up__search-item index__item' key={product.id}>
              <ThumbCard 
                title={product.name}
                subtitle={product.description}
                onClick={() => selectProduct(product)}
                selected={true}
              />
            </div>
        ))
  const searchItemDivs = props.products
        .filter(p => searchFilter.length && p.name.toLowerCase().includes(searchFilter.toLowerCase()) || !searchFilter.length)
        .map(( product, i ) => (
            <div className='fade-in up__search-item index__item' key={i}>
              <ThumbCard 
                title={product.name}
                subtitle={product.description}
                onClick={() => selectProduct(product)}
              />
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
          { selectedItemDivs}
          <br />
          { searchItemDivs }
        </div>
      </div>
      <div className="col-9 up__list flex__row fade-in-list">
        {selectedProduct && <UserProductItems product={selectedProduct} />} 
      </div>
    </div>
  )
}

export default UserProducts
