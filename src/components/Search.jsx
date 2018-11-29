import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchOption from './SearchOption';
import Index from './Index';
import { sendAction } from '../lib/api';

import '../style/search.sass';
import '../style/transitions/indexTransition.sass';



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
  const [productOptions, setProductOptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelected] = useState(null)

  const handleOnClick = (key, name) => {
    setSearchInput(name)
    setSelected(key)
  }

  const searchHandler = (value) => {
    if(selectedOption)
      setSelected(null)
    setSearchInput(value)
  }

  const productRows = productOptions.map((product, i) => (
    <SearchOption title={product} key={i} index={i} clickHandler={handleOnClick}/>
  ))

  useEffect(() => {
    if(selectedOption) return
    sendAction(buildQuery(searchInput))
      .then(res => {
        setProductOptions(res.products.map(p => p.name))
      })

  }, [searchInput])

  return (
  <div className={`content ${selectedOption ? 'index-shown' : 'search-shown'}`}>
    <div className='search__container'>
      <SearchBar input={searchInput} inputHandler={searchHandler} />
      <ol className='search__list fade-in-list'>
        {productRows}
      </ol>
    </div>
    { selectedOption && <Index title={productOptions[selectedOption]}/>}
  </div>
  )
}

export default Search;
