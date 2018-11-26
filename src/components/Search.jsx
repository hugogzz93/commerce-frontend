import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import '../style/search.sass';
import { sendAction } from '../lib/api';


const buildQuery = (search) => `
  {
    products(search: {
      name: "${search}"
    }) {
      name
    }
  }
`

function Search(props) {
  const [productOptions, setProductOptions] = useState(['car', 'dog'])
  const [searchInput, setSearchInput] = useState('')

  const productRows = productOptions.map((product, i) => (
    <div key={i} className='search__option'>
      {product}
    </div>
  ))
  
  useEffect(() => {
    sendAction(buildQuery(searchInput))
      .then(res => {
        console.log('effect')
        setProductOptions(res.products.map(p => p.name))
      })
  }, [searchInput])

  return (
    <div className='search__container'>
      <SearchBar input={searchInput} inputHandler={setSearchInput} />
      <ol className='search__list'>
        {productRows}
      </ol>
    </div>
  )
}

export default Search;
