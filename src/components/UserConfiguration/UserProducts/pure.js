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
            <ThumbCard 
              key={product.id}
              title={product.name}
              subtitle={product.description}
              onClick={() => selectProduct(product)}
              className='fade-in up__search-item card--highlight'
            />
        ))

  const searchItemDivs = props.products
        .filter(p => searchFilter.length && p.name.toLowerCase().includes(searchFilter.toLowerCase()) || !searchFilter.length)
        .map(( product, i ) => (
            <ThumbCard 
              title={product.name}
              subtitle={product.description}
              onClick={() => selectProduct(product)}
              className='fade-in up__search-item'
            />
        ))


  const colBaseSize = catFormActive ? 12 : 3


  return(
    <div className="grid-12 container--90 col-gap-10 row-gap-20">
      <div className={`s__content flex--col col-${colBaseSize}`}>
        <input className="s__input"
          autoComplete="false"
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <i className='fas fa-search'></i>
      </div>
      <div className={`col-${12 - colBaseSize}`}></div>
      <div className={`flex--col col-${colBaseSize}`}>
        <div className="">
          <NewProductForm onActiveChange={setCatFormState}/>
          <div className="tail" style={{marginBottom: '10px'}}></div>
          { selectedItemDivs}
          <div className="tail" style={{marginBottom: '10px'}}></div>
          { searchItemDivs }
        </div>
      </div>
      {!catFormActive && (
        <div className={`col-9 flex__row`}>
          {selectedProduct && <UserProductItems product={selectedProduct} />} 
        </div>
      )}
    </div>
  )
}

export default UserProducts
