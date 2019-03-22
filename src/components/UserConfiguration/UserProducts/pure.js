import React, { useEffect, useState, useReducer } from 'react'
import ThumbCard from '../../cards/ThumbCard'
import UserProductItems from '../UserProductItems'
import NewProductForm from './productForm'

const UserProducts = props => {
  const [searchFilter, setSearchFilter] = useState('')
  const [selectedCategory, selectCategory] = useState(null)
  const [catFormActive, setCatFormState] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if(!props.userId) return
    props.fetchData().then(data => {
      setCategories(data.categories)
    })
  }, [props.userId])

  useEffect(() => {
    if(categories.length && !selectedCategory) 
      selectCategory(categories[0])
  }, [categories])

  const createCategory = () => {}
  // const createCategory = () => (
  //   props.createCategory(searchFilter)
  // )


  const searchItemDivs = categories
        .filter(p => searchFilter.length && p.name.toLowerCase().includes(searchFilter.toLowerCase()) || !searchFilter.length)
        .sort((a,b) => b.products.length - a.products.length)
        .map(( category, i ) => (
            <ThumbCard 
              key={category.id}
              title={category.name}
              subtitle={(() => {
                const num = category.products.length
                if(num == 0)  return ''
                if(num > 1) return num + ' products'
                return '1 product'
              })() }
              onClick={() => selectCategory(category)}
              className={`fade-in ${selectedCategory == category ? 'card--highlight' : ''}`}
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
      <div className={`flex--col col-${colBaseSize}`} style={{
        overflowY: 'scroll',
        padding: '1px',
        maxHeight: '120vh'
      }}>
        <NewProductForm onActiveChange={setCatFormState}/>
        <div className="tail" style={{marginBottom: '10px'}}></div>
        {/* // { selectedItemDivs} */}
        <div className="tail" style={{marginBottom: '10px'}}></div>
        { searchItemDivs }
      </div>
      {!catFormActive && (
        <div className={`col-9 flex__row`}>
          {selectedCategory && <UserProductItems category={selectedCategory} />}
        </div>
      )}
    </div>
  )
}

export default UserProducts
