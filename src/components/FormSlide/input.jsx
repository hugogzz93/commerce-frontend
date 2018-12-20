import React from 'react'

const Input = props => {
  return (
    <div className={`form__control ${props.className}`}>
      <input className='form__input'
        type={props.type || 'text'}
        value={props.value}
        placeholder=" "
        name={props.name}
        onChange={props.onChange}
      />
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  )
}

export default Input
