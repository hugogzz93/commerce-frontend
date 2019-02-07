import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './SearchBar';
import SearchOption from './SearchOption';
import Index from '../Index/index';

function Search(props) {
  const searchOptions = props.searchOptions;
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelected] = useState(null)
  const [optionCursor, setOptionCursor] = useState(0)


  const handleOnClick = (key, name) => {
    setSelected(key)
    setSearchInput(name)
  }

  const searchRows = props.searchOptions
    .filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase()))
    .map(({name, id}, i) => (
      <SearchOption
        index={id}
        title={name}
        key={id}
        clickHandler={handleOnClick}
        selected={optionCursor == i ? true : false}
      />
    ))


  useEffect(() => {
    if(selectedOption) return
    const handleKeys = e => {
      if(e.target != document.body) return
      switch(e.which) {
        case 40:
          setOptionCursor(( optionCursor + 1 + searchOptions.length ) % searchOptions.length)
          break

        case 38:
          setOptionCursor(( optionCursor - 1  + searchOptions.length) % searchOptions.length)
          break

        case 13:
          const {id, name} = searchOptions[optionCursor]
          handleOnClick(id, name)
      }
    }

    window.addEventListener('keydown', handleKeys )
    return () => window.removeEventListener('keydown', handleKeys)
  }, [optionCursor, searchOptions])

  useEffect(() => {
    props.getProducts()
  }, [])

  useEffect(() => {
    if(selectedOption) return
    setOptionCursor(0)
  }, [searchInput, selectedOption])

  return (
  <div className={`content ${selectedOption ? 'index-shown' : 'search-shown'}`}>
    <div className='search__container'>
      <SearchBar input={searchInput} inputHandler={(value) => {
        if(selectedOption)
          setSelected(null)
        setSearchInput(value)
      }} />
      {searchOptions.lenght}
      <div className='search__list fade-in-list'>
        {searchRows}
      </div>
    </div>
    { selectedOption && <Index productId={searchOptions.find(e => e.id == selectedOption).id}/>}
  </div>
  )
}

export default Search;
