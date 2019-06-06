import React from 'react'
const SearchInput = ( {value, onChange, colSize} ) => {
  const input = React.createRef()
  return (
      <div className={`s__content flex--col col-${colSize}`}>
        <input
          className="s__input"
          autoComplete="false"
          name='search'
          type="text"
          value={value}
          onChange={onChange}
          ref={input}
        />
          <i className="fas fa-search" onClick={() => input.current.focus()} />
      </div>
  )
}

export default SearchInput
