import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchOption from './SearchOption';
import Index from './Index';
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
  const [productOptions, setProductOptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelected] = useState(null)

  const handleOnClick = (key) => {
    setSelected(key)
  }

  const productRows = productOptions.map((product, i) => (
    <SearchOption title={product} key={i} index={i} clickHandler={handleOnClick}/>
  ))
  
  useEffect(() => {
    sendAction(buildQuery(searchInput))
      .then(res => {
        console.log('effect')
        setProductOptions(res.products.map(p => p.name))
      })
  }, [searchInput])

  const body = selectedOption ? (
    <Index title={productOptions[selectedOption]}/>
  ) : (
    <div className={`search__container ${selectedOption ? 'selected' : ''}`} >
      <SearchBar input={searchInput} inputHandler={setSearchInput} />
      {selectedOption}
      <ol className='search__list fade-in-list'>
        {productRows}
      </ol>
    </div>
  )

  return (
  <div className='content'>
    {body}
  </div>
  )
}

export default Search;
