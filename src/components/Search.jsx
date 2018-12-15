import React, { useState, useEffect, useReducer } from 'react';
import gql from 'graphql-tag';
import SearchBar from './SearchBar';
import SearchOption from './SearchOption';
import Index from './Index';
import { sendQuery } from '../lib/api';


import '../style/search.sass';
import '../style/transitions/indexTransition.sass';



const GET_PRODUCTS = gql`
  query GetProducts($name: String)
  {
    products(productQuery: {name: $name}) {
      title: name
      id
    }
  }
`;

function Search(props) {
  const [searchOptions, setSearchOptions] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelected] = useState(null)
  const [optionCursor, setOptionCursor] = useState(0)

  const handleOnClick = (key, name) => {
    setSelected(key)
    setSearchInput(name)
  }

  const searchHandler = (value) => {
    if(selectedOption)
      setSelected(null)
    setSearchInput(value)
  }

  const searchRows = searchOptions.map(({title, id}, i) => (
    <SearchOption
      title={title}
      key={id}
      index={id}
      clickHandler={handleOnClick}
      selected={optionCursor == i ? true : false}
    />
  ))


  useEffect(() => {
    const handleKeys = e => {
      switch(e.which) {
        case 40:
          setOptionCursor(( optionCursor + 1 + searchOptions.length ) % searchOptions.length)
          break

        case 38:
          setOptionCursor(( optionCursor - 1  + searchOptions.length) % searchOptions.length)
          break
        
        case 13:
          const {id, title} = searchOptions[optionCursor]
          handleOnClick(id, title)
      }

    }
    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  }, [optionCursor, searchOptions])

  useEffect(() => {
    if(selectedOption) return
    setOptionCursor(0)
    sendQuery({ 
      query: GET_PRODUCTS,
      variables: {
        name: searchInput
      }})
      .then(res => {
        setSearchOptions(res.data.products)
      })

  }, [searchInput, selectedOption])

  return (
  <div className={`content ${selectedOption ? 'index-shown' : 'search-shown'}`}>
    <div className='search__container'>
      <SearchBar input={searchInput} inputHandler={searchHandler} />
      {searchOptions.lenght}
      <div className='search__list fade-in-list'>
        {searchRows}
      </div>
    </div>
    { selectedOption && <Index product={searchOptions[selectedOption]}/>}
  </div>
  )
}

export default Search;
