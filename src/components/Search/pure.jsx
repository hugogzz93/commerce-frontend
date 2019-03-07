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
      <div 
        class="search__option card card--clickable fade-in"
        onClick={() => {
          setSelected(id)
          setSearchInput(name)
        }}
        key={id}>
          <div className="t--size-h5">
            {name}
          </div>
      </div>
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


  const searchBarDiv = (
      <SearchBar 
        input={searchInput}
        inputHandler={(value) => {
          setSearchInput(value)
          if(selectedOption) setSelected(null)
        }}
      />
  )

  let slide = null
  if(selectedOption)
    slide =  (
      <Index productId={searchOptions.find(e => e.id == selectedOption).id}/>
    )
  else
    slide =  (
      <div className='container--90'>
        {searchRows}
      </div>
    )

  return (
    <div class={selectedOption ? 'index-shown' : ''}>
      <div class="container--80 flex--col flex--centered">
        {searchBarDiv}
        {slide}
      </div>
    </div>
  )
}

export default Search;
