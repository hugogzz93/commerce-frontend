import React, { useEffect, useState, useReducer } from 'react'
import ThumbCard from '../../cards/ThumbCard'
import UserProductItems from '../UserProductItems'
import NewProductForm from './productForm'

const UserProducts = props => {
  const userId = props.userId
  const [searchFilter, setSearchFilter] = useState('')
  const [selectedProduct, selectProduct] = useState(null)
  const [catFormActive, setCatFormState] = useState(false)

  useEffect(() => {
    props.getUserProducts({userId})
    props.getProducts()
  }, [userId])

  useEffect(() => {
    if(props.userProducts[0] && !selectedProduct) 
      selectProduct(props.userProducts[0])
  }, [props.userProducts])

  const createCategory = () => (
    props.createCategory(searchFilter)
  )

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
      <div className={`flex--col col-${catFormActive ? 12 : 3} up__search`}>
        <div className="s__content">
          <input className="s__input"
            autoComplete="false"
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <i className='fas fa-search'></i>
        </div>
        <div className="up__search-items fade-in-list">
          <NewProductForm onActiveChange={setCatFormState}/>
          <div className="tail" style={{marginBottom: '10px'}}></div>
          { selectedItemDivs}
          <div className="tail" style={{marginBottom: '10px'}}></div>
          { searchItemDivs }
        </div>
      </div>
      {!catFormActive && (
        <div className={`col-9 up__list flex__row fade-in-list`}>
          {selectedProduct && <UserProductItems product={selectedProduct} />} 
        </div>
      )}
    </div>
  )
}

export default UserProducts
