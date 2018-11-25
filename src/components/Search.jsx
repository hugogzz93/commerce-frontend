import React, { useState } from 'react';
import '../style/search.sass';

export default function Search(props) {
  const [input, setInput] = useState('');

  function handleSearchInput (event) {
    setInput(event.target.value);
  }
  return (
    <div className='searchBar'>
      <input value={input} onChange={handleSearchInput}/>
    </div>
  )
}
