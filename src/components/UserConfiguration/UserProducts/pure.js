import React, { useEffect, useState, useReducer } from 'react'
import ThumbCard from '../../cards/ThumbCard'
import UserProductItems from '../UserProductItems'

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
        {props.userProducts[0] && <UserProductItems product={props.userProducts[0]} />} 
      </div>
    </div>
  )
}

export default UserProducts
