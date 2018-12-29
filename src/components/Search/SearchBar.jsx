import React from 'react';

export default function SearchBar(props) {
  const {input, inputHandler} = props;

  return (
      <input
        className='search__bar'
        placeholder='Find...'
        value={input}
        onChange={(e) => inputHandler(e.target.value)}/>
  )
}
