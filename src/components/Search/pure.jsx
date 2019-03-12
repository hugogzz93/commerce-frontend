import React, { useState, useEffect, useReducer } from 'react';
import SearchBar from './SearchBar';
import Index from '../Index/index';
import Helpers from '../../lib/helpers'

function Search(props) {
  const [searchInput, setSearchInput] = useState('')
  const [selectedOption, setSelected] = useState(null)
  const [optionCursor, setOptionCursor] = useState(0)
  const [categories, setCategories] = useState([])


  const handleOnClick = ({id, name}) => {
    setSelected(id)
    setSearchInput(name)
  }

  const searchRows = categories
    .filter(category => category.name.toLowerCase().includes(searchInput.toLowerCase()))
    .map(({name, id}, i) => (
      <div 
        className={`card card--clickable fade-in ${optionCursor == i ? 'card--highlight' : ''}`}
        style={{minHeight: '10rem'}}
        onClick={() => handleOnClick({id, name})}
        key={id}>
          <div className="t--size-h5">
            {name}
          </div>
      </div>
    ))

  useEffect(() => {
    props.fetchCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setOptionCursor(0)
  }, [searchInput])

  useEffect(() => {
    if(selectedOption) return

    const keyHandler = Helpers.createKeyHandler({
      target: document.body,
      [40]: () => setOptionCursor(( optionCursor + 1 + categories.length ) % categories.length),
      [38]: () => setOptionCursor(( optionCursor - 1  + categories.length) % categories.length),
      [13]: () => handleOnClick(categories[optionCursor])
    })

    window.addEventListener('keydown', keyHandler )
    return () => window.removeEventListener('keydown', keyHandler)
  }, [optionCursor, categories])


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
      <Index id={categories.find(e => e.id == selectedOption).id}/>
    )
  else
    slide =  (
      <div className='container--90'>
        {searchRows}
      </div>
    )

  return (
    <div className={selectedOption ? 'index-shown' : ''}>
      <div className="container--80 flex--col flex--centered">
        {searchBarDiv}
        {slide}
      </div>
    </div>
  )
}

export default Search;
