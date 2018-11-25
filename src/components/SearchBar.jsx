import React, { useState } from 'react';

export default function SearchBar(props) {
  const [input, setInput] = useState('');

  function handleSearchInput (event) {
    setInput(event.target.value);
  }
  return (
      <input
        className='search__bar'
        value={input}
        onChange={handleSearchInput}/>
  )
}
