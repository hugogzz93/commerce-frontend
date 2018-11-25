import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import '../style/search.sass';

export default function Search(props) {
  const [productOptions, setProductOptions] = useState(['car', 'dog'])

  const productRows = productOptions.map((product, i) => (
    <div key={i} className='search__option'>
      {product}
    </div>
  ))

  return (
    <div className='search__container'>
      <SearchBar/>
      <ol className='search__list'>
        {productRows}
      </ol>
    </div>
  )
}

const useProductOptions = () => {
}
